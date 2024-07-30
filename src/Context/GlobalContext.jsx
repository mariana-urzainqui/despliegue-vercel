import { createContext, useContext, useEffect, useState } from "react";
import { crearProducto, eliminarProductoPorId, obtenerProductos } from "../helpers/productos";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from 'uuid';
import { obtenerCarrito } from "../helpers/cart";

const GlobalContext = createContext()

export const GlobalContextProvider = ({ children }) => {
    const [productos, setProductos] = useState(obtenerProductos())
    const [searchTerm, setSearchTerm] = useState('')
    const [carrito, setCarrito] = useState(obtenerProductos())
    const navigation = useNavigate()

    const handleChangeSearchTerm = ( e ) => {
        setSearchTerm(e.target.value)
    }

    useEffect (() => {
        const productList = obtenerProductos()
        if(searchTerm != ''){
        const newProductList = productList.filter(product => product.nombre.toLowerCase().includes(searchTerm.toLowerCase()))
        setProductos(newProductList)
        }
        else{
            setProductos(productList)
        }
    }, [searchTerm])

    const handleEliminarProducto = (id) => {
        setProductos(eliminarProductoPorId(id))
        navigation('/')
    }

    const getUserData = () => {
        const user = JSON.parse(localStorage.getItem('user'))
        return user
    }

    const logout = () => {
        localStorage.removeItem('user')
        navigation('/login')
    }

    const handleCreateProduct = (e) => {
        e.preventDefault()
        console.log("Producto creado")
        const formulario = e.target
        const formularioValores = new FormData(formulario)

        const nuevoProducto = {
            nombre: "",
            descripcion: "",
            precio: 0,
            stock: 0,
            codigo: "",
            categoria: "",
            thumbanil: ''
        }
        for(let propiedad in nuevoProducto){
            nuevoProducto[propiedad] = formularioValores.get(propiedad)
        }
        nuevoProducto.id = uuid()

        setProductos([...productos, nuevoProducto])
        crearProducto(nuevoProducto)
        navigation('/')
    }

    return (
        <GlobalContext.Provider value={
            {
                productos: productos,
                handleEliminarProducto: handleEliminarProducto,
                getUserData: getUserData,
                logout: logout,
                handleCreateProduct: handleCreateProduct,
                carrito: carrito,
                handleChangeSearchTerm,
                searchTerm

            }
        }>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(GlobalContext)
}