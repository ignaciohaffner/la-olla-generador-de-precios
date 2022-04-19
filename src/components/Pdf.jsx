import React from 'react'
import { jsPDF } from "jspdf";

const doc = new jsPDF({
    orientation: "landscape",
    unit: "px",
    format: [1512, 1512]
  });
doc.text("Hello world!", 1, 1);


var docs = new jsPDF({
    orientation: "landscape",
    unit: "px",
    format: [500, 500],
  });
 var javier = 'mogo'
 
doc.setFillColor(27,30,35)
doc.circle(2, 20, 10000, 'F');
//  doc.addImage(imgOlla, 'JPEG', 375, 40, 250, 247)
 doc.setTextColor(255, 255, 255);
 doc.setFontSize(50)
doc.text(20, 340, 'PIZZAS')
 doc.setFontSize(35)
doc.text(20, 380, 'Muzzarella')
doc.text(20, 410, 'Muzza con Jamon')
doc.text(20, 440, 'Muzza con jamon y morron')
doc.text(20, 470, 'Napolitana')
doc.text(20, 500, 'Napolitana c/ jamon')
doc.text(20, 530, 'Muzza con huevo')
doc.text(20, 560, 'Muzza con roquefort')
doc.text(20, 590, 'Muzza con anchoas')
doc.text(20, 620, 'Muzza con jamon y anana')
doc.text(20, 650, 'Muzza con panceta')
doc.text(20, 680, 'Muzza jamon palmito y huevo')
doc.text(20, 710, 'Calabresa')
doc.text(20, 740, 'Fugazzeta')

doc.text(400, 380, "$500")
doc.text(400, 410, '$500')
doc.text(400, 440, '$500')
doc.text(400, 470, '$500')
doc.text(400, 500, '$500')
doc.text(400, 530, '$500')
doc.text(400, 560, '$500')
doc.text(400, 590, '$500')
doc.text(400, 620, '$500')
doc.text(400, 650, '$500')
doc.text(400, 680, '$500')
doc.text(400, 710, '$500')
doc.text(400, 740, '$500')

 doc.setFontSize(50)
doc.text(550, 340, 'TARTAS')
 doc.setFontSize(35)

doc.text(550, 380, 'Muzzarella')
doc.text(550, 410, 'Muzza con Jamon')
doc.text(550, 440, 'Muzza con jamon y morron')
doc.text(550, 470, 'Napolitana')

doc.text(920, 380, "$500")
doc.text(920, 410, '$500')
doc.text(920, 440, '$500')
doc.text(920, 470, '$500')

 doc.setFontSize(50)
doc.text(550, 530, 'EMPANADAS')
 doc.setFontSize(35)
 
 doc.text(550, 380, 'Carne salada')
doc.text(550, 410, 'Carne dulce')
doc.text(550, 440, 'Jamon y queso')
doc.text(550, 470, 'Cebolla y queso')
 doc.text(550, 380, 'Carne salada')
doc.text(550, 410, 'Carne dulce')
doc.text(550, 440, 'Jamon y queso')
doc.text(550, 470, 'Cebolla y queso')

// doc.save("two-by-four.pdf");

const Pdf = () => {
  return (
    <div>
        <h2></h2>
    </div>
  )
}

export default Pdf