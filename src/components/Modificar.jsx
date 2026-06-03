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

        <div className="botones-area">
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

        <footer className="app-footer">
          <img src="/laolla.png" alt="La Olla" className="app-footer-logo" />
          <p className="app-footer-nombre">Rotisería La Olla</p>
          <p className="app-footer-dir">Maipu y Doello Jurado · Gualeguaychú</p>
          <div className="app-footer-redes">
            <a href="https://wa.me/543446410459" className="app-footer-link" target="_blank" rel="noreferrer">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              3446-410459
            </a>
            <a href="https://www.instagram.com/rotiserialaolla/" className="app-footer-link" target="_blank" rel="noreferrer">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              @rotiserialaolla
            </a>
            <a href="https://www.facebook.com/p/Rotiseria-La-Olla-100054471429554/" className="app-footer-link" target="_blank" rel="noreferrer">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Rotisería La Olla
            </a>
          </div>
        </footer>

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
