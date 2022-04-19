import React from 'react'
import { useRef, useState } from "react";
import './Result.css'
import descargar from "../utils/descargar";
// import Modificar from './Modificar';

const Result = () => {
    let naye = '500'
    

  return (
    <div>
        <div className="parent">
        <div ref={exportRef}>
        <div id='sacafoto' className='imprimir'>
            <img src="https://i.imgur.com/IxHKMaO.png" alt="" />
            <div className="row">
                <div className="col-sm">
                    <h2>Pizzas</h2>
                    <div className="row">
                    <div className="col pizzas">
                        <p className='comida'>Muzzarella</p>
                        <p className='comida'>Muzza con jamon</p>
                        <p className='comida'>Muzza con jamon y morron</p>
                        <p className='comida'>Napolitana</p>
                        <p className='comida'>Napolitana con jamon</p>
                        <p className='comida'>Muzza con huevo</p>
                        <p className='comida'>Muzza con roquefort</p>
                        <p className='comida'>Muzza con anchoas</p>
                        <p className='comida'>Muzza con jamon y anana</p>
                        <p className='comida'>Muzza con panceta</p>
                        <p className='comida'>Muzza jamon palmito y huevo</p>
                        <p className='comida'>Calabresa</p>
                        <p className='comida'>Fugazzeta</p>
                    </div>
                    <div className="col precio-pizza">
                        <p>$</p>
                        <p>${naye}</p>
                        <p>${naye}</p>
                        <p>${naye}</p>
                        <p>${naye}</p>
                        <p>${naye}</p>
                        <p>${naye}</p>
                        <p>${naye}</p>
                        <p>${naye}</p>
                        <p>${naye}</p>
                        <p>${naye}</p>
                        <p>${naye}</p>
                        <p>${naye}</p>
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
                            <p>${naye}</p>
                            <p>${naye}</p>
                            <p>${naye}</p>
                            <p>${naye}</p>
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

                    <h3>${naye} DOCENA - ${naye} C/U</h3>
                </div>
            </div>
        </div>
        </div>
        </div>
        <button onClick={() => descargar(exportRef.current, "test")}>
        Capture Image
      </button>
      <button onClick={() => setOverflow(!enableOverflow)}>
        {enableOverflow ? "Disable Overflow" : "Enable Overflow"}
      </button>
    </div>

  )
}

export default Result