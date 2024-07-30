import React from 'react'
import { useGlobalContext } from '../../Context/GlobalContext'

const Cart = () => {
    const {carrito} = useGlobalContext()
    console.log(carrito)
    return (
        <div>Cart</div>
    )
}

export default Cart
