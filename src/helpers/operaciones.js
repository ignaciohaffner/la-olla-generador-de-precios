export const operaciones = (precio, setPrecio) => {

    const { precio1, precio2 } = precio;

    const handleChange = (e) => {
        setPrecio({
            ...precio, 
            [e.target.name]: e.target.value
        });
    };

 

    const suma = () => numero1 + numero2;
    const resta = () => numero1 - numero2;
    const division = () => 
        0 == numero2 ? "No se puede maestro": (numero1 / numero2);
    const multiplicacion = () => numero1*numero2;

    return { handleChange, suma, resta, division, multiplicacion, numero1, numero2}
}