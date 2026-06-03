import "./Modificar.css";
import React from "react";
import { useRef, useState } from "react";
import "./Result.css";
import descargar from "../utils/descargar";
import { categorias } from "../data/productos";

const Modificar = () => {
  const [precio, setPrecio] = useState({
    precio1: 0,
    precio2: 0,
    precio3: 0,
    precio4: 0,
    precio5: 0,
    precio6: 0,
    precio7: 0,
    precio8: 0,
    precio9: 0,
    precio10: 0,
    precio11: 0,
    precio12: 0,
    precio13: 0,
    precio14: 0,
    precio15: 0,
    precio16: 0,
    precio17: 0,
    precio18: 0,
    precio19: 0,
    precio20: 0,
    precio21: 0,
    precio22: 0,
    precio23: 0,
    precio24: 0,
    precio25: 0,
    precio26: 0,
    precio27: 0,
    precio28: 0,
    precio29: 0,
    precio30: 0,
    precio31: 0,
    precio32: 0,
    precio33: 0,
    precio34: 0,
    precio35: 0,
    precio36: 0,
    precio37: 0,
    precio38: 0,
    precio39: 0,
    precio40: 0,
    precio41: 0,
    precio42: 0,
  });

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

  const exportRef = useRef();
  const exportRef2 = useRef();

  function handleInputChange(e) {
    setPrecio((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const [abierto, setAbierto] = useState(null);

  const contarConPrecio = (productos) =>
    productos.filter((p) => Number(precio[p.stateKey]) > 0).length;

  return (
    <>
      <div className="form-wrapper">
        <header className="form-header">
          <h1 className="form-titulo">Lista de Precios</h1>
        </header>

        <main className="form-main">
          {categorias.map((cat) => {
            const estaAbierto = abierto === cat.id;
            const conPrecio = contarConPrecio(cat.productos);
            return (
              <section
                key={cat.id}
                className={`accordion-seccion${estaAbierto ? " is-open" : ""}`}
              >
                <button
                  className="accordion-header"
                  onClick={() => setAbierto(estaAbierto ? null : cat.id)}
                  aria-expanded={estaAbierto}
                  aria-controls={`panel-${cat.id}`}
                >
                  <span className="accordion-titulo">{cat.label}</span>
                  <span className="accordion-resumen">
                    {conPrecio > 0
                      ? `${conPrecio} de ${cat.productos.length} con precio`
                      : `${cat.productos.length} items`}
                  </span>
                  <span className="accordion-chevron" aria-hidden="true" />
                </button>
                <div className="accordion-cuerpo" id={`panel-${cat.id}`} aria-hidden={!estaAbierto}>
                  <ul className="producto-lista">
                    {cat.productos.map((p) => (
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
                            onChange={handleInputChange}
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
            Descargar pizzas
          </button>
          <button
            className="btn-descarga"
            onClick={() => descargar(exportRef2.current, "Precios Comidas")}
          >
            Descargar comida
          </button>
        </div>
      </div>

      <div style={{ overflowX: 'hidden' }}>
        <div className="parent">
          <div ref={exportRef}>
            <div id="sacafoto" className="imprimir">
              <img src="./laolla.png" alt="" />
              <div className="row">
                <div className="col-sm">
                  <h2>Pizzas</h2>
                  <div className="row">
                    <div className="col pizzas">
                      <p className="comida">Muzzarella</p>
                      <p className="comida">Muzza con jamon</p>
                      <p className="comida">Muzza con jamon y morron</p>
                      <p className="comida">Napolitana</p>
                      <p className="comida">Napolitana con jamon</p>
                      <p className="comida">Muzza con huevo</p>
                      <p className="comida">Muzza con roquefort</p>
                      <p className="comida">Muzza con anchoas</p>
                      <p className="comida">Muzza con jamon y anana</p>
                      <p className="comida">Muzza con panceta</p>
                      <p className="comida">Muzza jamon palmito y huevo</p>
                      <p className="comida">Calabresa</p>
                      <p className="comida">Fugazzeta</p>
                    </div>
                    <div className="col precio-pizza">
                      <p className="">${precio1}</p>
                      <p>${precio2}</p>
                      <p>${precio3}</p>
                      <p>${precio4}</p>
                      <p>${precio5}</p>
                      <p>${precio6}</p>
                      <p>${precio7}</p>
                      <p>${precio8}</p>
                      <p>${precio9}</p>
                      <p>${precio10}</p>
                      <p>${precio11}</p>
                      <p>${precio12}</p>
                      <p>${precio13}</p>
                    </div>
                  </div>
                </div>
                <div className="col-sm">
                  <h2>Tartas</h2>
                  <div className="row">
                    <div className="col">
                      <p>Jamon y queso</p>
                      <p>Jamon queso y tomate</p>
                      <p>Verdura</p>
                      <p>Choclo</p>
                    </div>
                    <div className="col">
                      <p>${precio14}</p>
                      <p>${precio15}</p>
                      <p>${precio16}</p>
                      <p>${precio17}</p>
                    </div>
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

                  <h3>
                    ${precio19} DOCENA - ${precio18} C/U
                  </h3>
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
                  <div className="row">
                    <div className="col pizzas">
                      <p className="comida">Carne al horno c/ guarnicion</p>
                      <p className="comida">Pollo al horno c/ guarnicion</p>
                      <p className="comida">Milanesa de carne x Kg</p>
                      <p className="comida">Milanesa de pollo x Kg</p>
                      <p className="comida">Milanesa de pescado x Kg</p>
                      <p className="comida">Napolitana de carne x Kg</p>
                      <p className="comida">Napolitana de pollo x Kg</p>
                      <p className="comida">Tortilla de papa x Kg</p>
                      <p className="comida">Tortilla de verdura x Kg</p>
                      <p className="comida">Papas fritas</p>
                      <p className="comida">Pure</p>
                      <p className="comida">Papa al horno</p>
                      <p className="comida">Ensalada (surtida)</p>
                    </div>
                    <div className="col precio-pizza">
                      <p>${precio20}</p>
                      <p>${precio21}</p>
                      <p>${precio22}</p>
                      <p>${precio23}</p>
                      <p>${precio24}</p>
                      <p>${precio25}</p>
                      <p>${precio26}</p>
                      <p>${precio27}</p>
                      <p>${precio28}</p>
                      <p className="papasfritas">
                        X1 ${precio29} X2 ${precio30} X3 ${precio31}
                      </p>
                      <br />
                      <p>${precio32}</p>
                      <p>${precio33}</p>
                      <p>${precio34}</p>
                    </div>
                  </div>
                </div>
                <div className="col-sm">
                  <h2>Pastas</h2>
                  <div className="row">
                    <div className="col">
                      <br />
                      <p className="comida">Ñoquis</p>
                      <p className="comida">Ravioles</p>
                      <p className="comida">Tallarines</p>
                      <p className="comida">Sorrentinos</p>
                    </div>
                    <div className="col">
                      <p className="comida">Con salsa</p>
                      <p>${precio35}</p>
                      <p>${precio36}</p>
                      <p>${precio37}</p>
                      <p>${precio38}</p>
                    </div>
                    <div className="col">
                      <p className="comida2">Bolognesa Estofado</p>
                      <br />
                      <p>${precio39}</p>
                      <p>${precio40}</p>
                      <p>${precio41}</p>
                      <p>${precio42}</p>
                    </div>
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

        {/* <button onClick={() => setOverflow(!enableOverflow)}>
        {enableOverflow ? "Disable Overflow" : "Enable Overflow"}
      </button> */}
      </div>
    </>
  );
};

export default Modificar;
