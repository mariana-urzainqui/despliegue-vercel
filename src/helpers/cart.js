export const obtenerCarrito = () => {
    const carrito = localStorage.getItem('carrito')
    if (carrito){
        return JSON.parse(carrito)
    }
    else{
        localStorage.setItem('carrito', JSON.stringify([]))
        return []
    }
}

export const guardarCarrito = (carrito) => {
    localStorage.setItem('carrito', JSON.stringify(carrito))
}