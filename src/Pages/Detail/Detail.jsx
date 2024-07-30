import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { obtenerProductoPorId, eliminarProductoPorId } from '../../helpers/productos'
import { useGlobalContext } from '../../Context/GlobalContext'


const Detail = () => {

    const parametros = useParams()
    const { handleEliminarProducto } = useGlobalContext()

    const producto = obtenerProductoPorId(parametros.producto_id)



    return (
        <div>
            {
                producto
                    ?
                    <>
                        <h1>{producto.nombre}</h1>
                        <span>Categoria: {producto.categoria}</span>
                        <p>
                            {producto.descripcion}
                        </p>
                        <span>
                            <b>Precio:</b>{producto.precio}
                        </span>
                        <span>
                            <b>Unidades disponibles:</b>
                            {producto.stock}
                        </span>
                        <br />
                        <button>Comprar</button>
                        <button onClick={() => handleEliminarProducto(producto.id)}>Eliminar</button>
                    </>
                    :
                    <>
                    <h2>No se encontro producto con ese id</h2>
                    <Link to='/'>Ir a inicio</Link>
                    </>
            }
            
        </div>
    )
}

export default Detail
