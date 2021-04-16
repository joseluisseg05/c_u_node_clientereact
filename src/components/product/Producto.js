import React from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'

import clienteAxios from '../../config/axios'

function Producto({producto}) {
    const { _id, nombre, precio, imagen } = producto;

    const eliminarProducto = id => {
        Swal.fire({
            title: 'Quires eliminar este Producto?',
            text: "Una vez eliminado un Producto, no se podra recuperar!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Eliminar!',
            cancelButtonText: 'No, Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                clienteAxios.delete(`/productos/${id}`).then( res => {
                    Swal.fire(
                        'Exito!',
                        res.data.msj,
                        'success'
                    )
                })
            }
        })
    }

    return (
        <li className="producto">
            <div className="info-producto">
                <p className="nombre">{nombre}</p>
                <p className="precio">${precio}</p>
                { imagen ? ( //si hay imagen la busca en el servidor
                    <img src={`http://localhost:8080/${imagen}`} alt={nombre} />
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
                    Eliminar Producto
                </button>
            </div>
        </li>
    )
}

export default Producto;