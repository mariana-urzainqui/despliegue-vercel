import { productos } from "../data/productsData";

const guardarProductos = (productos) => {
    const productos_JSON = JSON.stringify(productos)
        localStorage.setItem('productos', productos_JSON)
} 

export const obtenerProductos = () => {
    const productos_guardados = localStorage.getItem('productos')
    if(productos_guardados){
        return JSON.parse(productos_guardados)
    }
    else{
        guardarProductos(productos)
        return productos
    }
}

/*
crearProducto(producto) lo guarda en localStorage con la key 'productos'' y retorna la lista modificada
obtenerProductoPorId(id) retornar el producto que cumpla con ese id
eliminarProductoPorId(id) elimina el producto que cumpla con ese id
 */



export const crearProducto = (nuevo_producto) => {
    let lista_productos = obtenerProductos()
    lista_productos.push(nuevo_producto)
    guardarProductos(lista_productos)
}

export const obtenerProductoPorId = (id) =>{
    const lista_productos = obtenerProductos()
    return lista_productos.find(producto => producto.id === id)
}

export const eliminarProductoPorId = (id) => {
    let lista_productos = obtenerProductos()
    lista_productos = lista_productos.filter(producto => Number(producto.id) !== Number(id))
    guardarProductos(lista_productos)
    return lista_productos
}

/* El detalle del componente Detail.jsx ahora debe venir de obtenerProductoPorId(id)

Van a crear un boton en la vista de Detail.jsx que se llamara 'eliminar' y al hacer click se ejecuta la funcion
eliminarProductoPorId(id)

La lista de productos que se mostrara en el componente Home.jsx sera dada a partir de la funcion obtenerProductos()

Crear una nueva screen/page/route llamada '/product/new' renderizara un formulario donde se le solicitara al usuario
informacion del producto:
nombre: string,
descripcion: string, mas de 10 caracteres,
precio: number psitivo distinto de 0,
stock: numero positivo distinto de 0,
codigo: string,
categoria: string,
thumbnail: string

TODAVIA no es necesario validaciones o capturas de dato, PERO si es necesario el Form en HTML */