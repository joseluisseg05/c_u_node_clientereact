import React from 'react'
import { Link } from 'react-router-dom'

function Producto({producto}) {
    const { _id, nombre, precio, imagen } = producto;

    const eliminarProducto = id => {

    }

    return (
        <li className="producto">
            <div className="info-producto">
                <p className="nombre">{nombre}</p>
                <p className="precio">${precio}</p>
                { imagen ? ( //si hay imagen la busca en el servidor
                    <img src={`http://localhost:8080/${imagen}`} />
                    //en caso contrario no regresa nada 
                ) : null }
            </div>
            <div className="acciones">
                <Link to={`/productos/editar/${_id}`} className="btn btn-azul">
                    <i className="fas fa-pen-alt"></i>
                    Editar Producto
                </Link>

                <button type="button" className="btn btn-rojo btn-eliminar" onClick={ () => eliminarProducto(_id) }>
                    <i className="fas fa-times"></i>
                    Eliminar Cliente
                </button>
            </div>
        </li>
    )
}

export default Producto;