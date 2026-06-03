import "./Modificar.css";
import React from "react";
import { useRef, useState, useEffect } from "react";
import "./Result.css";
import descargar from "../utils/descargar";
import { categorias } from "../data/productos";

function formatTiempo(ts) {
  const diff = Math.floor((Date.now() - ts) / 1000);
  if (diff < 10) return 'Guardado ahora';
  if (diff < 60) return `Guardado hace ${diff}s`;
  const mins = Math.floor(diff / 60);
  if (mins < 60) return `Guardado hace ${mins} min`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `Guardado hace ${hrs}h`;
  return `Guardado hace ${Math.floor(hrs / 24)}d`;
}

const PRECIO_INICIAL = {
  precio1: 0, precio2: 0, precio3: 0, precio4: 0, precio5: 0,
  precio6: 0, precio7: 0, precio8: 0, precio9: 0, precio10: 0,
  precio11: 0, precio12: 0, precio13: 0, precio14: 0, precio15: 0,
  precio16: 0, precio17: 0, precio18: 0, precio19: 0, precio20: 0,
  precio21: 0, precio22: 0, precio23: 0, precio24: 0, precio25: 0,
  precio26: 0, precio27: 0, precio28: 0, precio29: 0, precio30: 0,
  precio31: 0, precio32: 0, precio33: 0, precio34: 0, precio35: 0,
  precio36: 0, precio37: 0, precio38: 0, precio39: 0, precio40: 0,
  precio41: 0, precio42: 0,
};

const Modificar = () => {
  const [precio, setPrecio] = useState(() => {
    try {
      const guardado = localStorage.getItem('laolla-precios');
      if (guardado) return { ...PRECIO_INICIAL, ...JSON.parse(guardado) };
    } catch {}
    return PRECIO_INICIAL;
  });

  useEffect(() => {
    localStorage.setItem('laolla-precios', JSON.stringify(precio));
    if (isFirstRender.current) { isFirstRender.current = false; return; }
    const now = Date.now();
    localStorage.setItem('laolla-guardado', String(now));
    setUltimoGuardado(now);
  }, [precio]);

  const {
    precio1,
    precio2,
    precio3,
    precio4,
    precio5,
    precio6,
    precio7,
    precio8,
    precio9,
    precio10,
    precio11,
    precio12,
    precio13,
    precio14,
    precio15,
    precio16,
    precio17,
    precio18,
    precio19,
    precio20,
    precio21,
    precio22,
    precio23,
    precio24,
    precio25,
    precio26,
    precio27,
    precio28,
    precio29,
    precio30,
    precio31,
    precio32,
    precio33,
    precio34,
    precio35,
    precio36,
    precio37,
    precio38,
    precio39,
    precio40,
    precio41,
    precio42,
  } = precio;

  const [ultimoGuardado, setUltimoGuardado] = useState(() => {
    try {
      const ts = localStorage.getItem('laolla-guardado');
      return ts ? Number(ts) : null;
    } catch { return null; }
  });
  const [tiempoTexto, setTiempoTexto] = useState('');
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (!ultimoGuardado) return;
    const update = () => setTiempoTexto(formatTiempo(ultimoGuardado));
    update();
    const id = setInterval(update, 30_000);
    return () => clearInterval(id);
  }, [ultimoGuardado]);

  const exportRef = useRef();
  const exportRef2 = useRef();
  const seccionRefs = useRef({});

  function handleInputChange(e) {
    setPrecio((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleKeyDown(e, productos, index) {
    if (e.key === 'Enter') {
      e.preventDefault();
      const next = productos[index + 1];
      if (next) {
        document.getElementById(next.stateKey)?.focus();
      } else {
        e.target.blur();
      }
    }
  }

  const [abierto, setAbierto] = useState(null);

  const STICKY_OFFSET = 117; // nav-height (64) + form-header-height (53)

  function handleToggle(id, estaAbierto) {
    if (estaAbierto) {
      const el = seccionRefs.current[id];
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - STICKY_OFFSET;
        window.scrollTo({ top: Math.max(0, top), behavior: 'instant' });
      }
    }
    setAbierto(estaAbierto ? null : id);
  }

  const contarConPrecio = (productos) =>
    productos.filter((p) => Number(precio[p.stateKey]) > 0).length;

  return (
    <>
      <div className="form-wrapper">
        <header className="form-header">
          <h1 className="form-titulo">Lista de Precios</h1>
          {tiempoTexto && <span className="form-guardado">{tiempoTexto}</span>}
        </header>

        <main className="form-main">
          {categorias.map((cat) => {
            const estaAbierto = abierto === cat.id;
            const conPrecio = contarConPrecio(cat.productos);
            const total = cat.productos.length;
            const estadoBadge = conPrecio === total ? 'completo' : conPrecio > 0 ? 'parcial' : 'vacio';
            return (
              <section
                key={cat.id}
                ref={el => { seccionRefs.current[cat.id] = el; }}
                className={`accordion-seccion${estaAbierto ? " is-open" : ""}`}
              >
                <button
                  className="accordion-header"
                  onClick={() => handleToggle(cat.id, estaAbierto)}
                  aria-expanded={estaAbierto}
                  aria-controls={`panel-${cat.id}`}
                >
                  <span className="accordion-titulo">{cat.label}</span>
                  <span className="accordion-resumen" data-estado={estadoBadge}>
                    {estadoBadge === 'completo' && `${total} / ${total} ✓`}
                    {estadoBadge === 'parcial' && `${conPrecio} / ${total}`}
                    {estadoBadge === 'vacio' && `${total} items`}
                  </span>
                  <span className="accordion-chevron" aria-hidden="true" />
                </button>
                <div className="accordion-cuerpo" id={`panel-${cat.id}`} aria-hidden={!estaAbierto}>
                  <ul className="producto-lista">
                    {cat.productos.map((p, i) => (
                      <li
                        key={p.stateKey}
                        className="producto-fila"
                        onClick={() =>
                          document.getElementById(p.stateKey)?.focus()
                        }
                      >
                        <label
                          htmlFor={p.stateKey}
                          className="producto-nombre"
                        >
                          {p.nombre}
                        </label>
                        <div className="precio-wrapper">
                          <span className="precio-prefijo">$</span>
                          <input
                            id={p.stateKey}
                            type="number"
                            inputMode="decimal"
                            className="precio-input"
                            name={p.stateKey}
                            value={precio[p.stateKey] || ''}
                            onChange={handleInputChange}
                            onKeyDown={(e) => handleKeyDown(e, cat.productos, i)}
                            placeholder="0"
                            tabIndex={estaAbierto ? 0 : -1}
                          />
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            );
          })}
        </main>

        <div className="botones-sticky">
          <button
            className="btn-descarga"
            onClick={() => descargar(exportRef.current, "Precios Pizzas")}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Pizzas
          </button>
          <button
            className="btn-descarga"
            onClick={() => descargar(exportRef2.current, "Precios Comidas")}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Comidas
          </button>
        </div>
      </div>

      <div className="export-oculto">
        <div className="parent">
          <div ref={exportRef}>
            <div id="sacafoto" className="imprimir">
              <img src="./laolla.png" alt="" />
              <div className="row">
                <div className="col-sm">
                  <h2>Pizzas</h2>
                  <div className="export-lista">
                    <div className="export-row"><span className="export-nombre">Muzzarella</span><span className="export-precio">${precio1}</span></div>
                    <div className="export-row"><span className="export-nombre">Muzza con jamon</span><span className="export-precio">${precio2}</span></div>
                    <div className="export-row"><span className="export-nombre">Muzza con jamon y morron</span><span className="export-precio">${precio3}</span></div>
                    <div className="export-row"><span className="export-nombre">Napolitana</span><span className="export-precio">${precio4}</span></div>
                    <div className="export-row"><span className="export-nombre">Napolitana con jamon</span><span className="export-precio">${precio5}</span></div>
                    <div className="export-row"><span className="export-nombre">Muzza con huevo</span><span className="export-precio">${precio6}</span></div>
                    <div className="export-row"><span className="export-nombre">Muzza con roquefort</span><span className="export-precio">${precio7}</span></div>
                    <div className="export-row"><span className="export-nombre">Muzza con anchoas</span><span className="export-precio">${precio8}</span></div>
                    <div className="export-row"><span className="export-nombre">Muzza con jamon y anana</span><span className="export-precio">${precio9}</span></div>
                    <div className="export-row"><span className="export-nombre">Muzza con panceta</span><span className="export-precio">${precio10}</span></div>
                    <div className="export-row"><span className="export-nombre">Muzza jamon palmito y huevo</span><span className="export-precio">${precio11}</span></div>
                    <div className="export-row"><span className="export-nombre">Calabresa</span><span className="export-precio">${precio12}</span></div>
                    <div className="export-row"><span className="export-nombre">Fugazzeta</span><span className="export-precio">${precio13}</span></div>
                  </div>
                </div>
                <div className="col-sm">
                  <h2>Tartas</h2>
                  <div className="export-lista">
                    <div className="export-row"><span className="export-nombre">Jamon y queso</span><span className="export-precio">${precio14}</span></div>
                    <div className="export-row"><span className="export-nombre">Jamon queso y tomate</span><span className="export-precio">${precio15}</span></div>
                    <div className="export-row"><span className="export-nombre">Verdura</span><span className="export-precio">${precio16}</span></div>
                    <div className="export-row"><span className="export-nombre">Choclo</span><span className="export-precio">${precio17}</span></div>
                  </div>
                  <h2>Empanadas</h2>
                  <p>Carne salada</p>
                  <p>Carne dulce</p>
                  <p>Jamon y queso</p>
                  <p>Cebolla y queso</p>
                  <p>Verdura</p>
                  <p>Choclo</p>
                  <p>Pollo</p>
                  <p>Queso dulce</p>
                  <h3>${precio19} DOCENA - ${precio18} C/U</h3>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="parent">
          <div ref={exportRef2}>
            <div className="imprimir">
              <img src="./laolla.png" alt="" />
              <div className="row">
                <div className="col-sm">
                  <h2>Comidas</h2>
                  <div className="export-lista">
                    <div className="export-row"><span className="export-nombre">Carne al horno c/ guarnicion</span><span className="export-precio">${precio20}</span></div>
                    <div className="export-row"><span className="export-nombre">Pollo al horno c/ guarnicion</span><span className="export-precio">${precio21}</span></div>
                    <div className="export-row"><span className="export-nombre">Milanesa de carne x Kg</span><span className="export-precio">${precio22}</span></div>
                    <div className="export-row"><span className="export-nombre">Milanesa de pollo x Kg</span><span className="export-precio">${precio23}</span></div>
                    <div className="export-row"><span className="export-nombre">Milanesa de pescado x Kg</span><span className="export-precio">${precio24}</span></div>
                    <div className="export-row"><span className="export-nombre">Napolitana de carne x Kg</span><span className="export-precio">${precio25}</span></div>
                    <div className="export-row"><span className="export-nombre">Napolitana de pollo x Kg</span><span className="export-precio">${precio26}</span></div>
                    <div className="export-row"><span className="export-nombre">Tortilla de papa x Kg</span><span className="export-precio">${precio27}</span></div>
                    <div className="export-row"><span className="export-nombre">Tortilla de verdura x Kg</span><span className="export-precio">${precio28}</span></div>
                    <div className="export-row"><span className="export-nombre">Papas fritas x1</span><span className="export-precio">${precio29}</span></div>
                    <div className="export-row"><span className="export-nombre">Papas fritas x2</span><span className="export-precio">${precio30}</span></div>
                    <div className="export-row"><span className="export-nombre">Papas fritas x3</span><span className="export-precio">${precio31}</span></div>
                    <div className="export-row"><span className="export-nombre">Pure</span><span className="export-precio">${precio32}</span></div>
                    <div className="export-row"><span className="export-nombre">Papa al horno</span><span className="export-precio">${precio33}</span></div>
                    <div className="export-row"><span className="export-nombre">Ensalada (surtida)</span><span className="export-precio">${precio34}</span></div>
                  </div>
                </div>
                <div className="col-sm">
                  <h2>Pastas</h2>
                  <div className="export-pastas">
                    <div className="export-pastas-header">
                      <span></span>
                      <span>Con salsa</span>
                      <span>Bolognesa</span>
                    </div>
                    <div className="export-pastas-row"><span>Ñoquis</span><span>${precio35}</span><span>${precio39}</span></div>
                    <div className="export-pastas-row"><span>Ravioles</span><span>${precio36}</span><span>${precio40}</span></div>
                    <div className="export-pastas-row"><span>Tallarines</span><span>${precio37}</span><span>${precio41}</span></div>
                    <div className="export-pastas-row"><span>Sorrentinos</span><span>${precio38}</span><span>${precio42}</span></div>
                  </div>
                  <div className="caja">
                    <h4>Rotiseria "La Olla</h4>
                    <h4>3446-410459</h4>
                    <h4>Maipu y Doello Jurado</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modificar;
