import React from 'react'
import { ProductList } from '../../Components'
import { obtenerProductos } from '../../helpers/productos'
import { crearProducto } from '../../helpers/productos'
import { useGlobalContext } from '../../Context/GlobalContext'
import { Link, useNavigate } from 'react-router-dom'

const Home = () => {
    const { productos, getUserData, logout, handleChangeSearchTerm, searchTerm } = useGlobalContext()
    const user = getUserData()

    return (
        <div>
            {
                user
                    ?
                    <button onClick={logout}>Cerrar sesion</button>
                    :
                    <Link to={'/login'}>Login</Link>
            }
            {
                (user && user.role === 'admin')
                &&
                <>
                    <Link to={'/product/new'}>Crear producto</Link>
                    <Link to={'/cart'}>Carrito</Link>
                </>
            }
            {
                (user && user.role === 'user')
                &&
                <>
                    <Link to={'/cart'}>Carrito</Link>
                </>
            }
            <input type="text" onChange={handleChangeSearchTerm} value={searchTerm}/>
            <h1>Elige nuestros productos</h1>
            <ProductList productos={productos} />
        </div>
    )
}

export default Home
