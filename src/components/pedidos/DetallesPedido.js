import React from "react";
import Swal from 'sweetalert2';

import clienteAxios from '../../config/axios'

function DetallesPedido({pedido}) {
    
    const {cliente} = pedido;

    const eliminarPedido = id => {        
        Swal.fire({            
            title: 'Quires eliminar este Pedido?',
            text: "Una vez eliminado un Pedido, no se podra recuperar!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Eliminar!',
            cancelButtonText: 'No, Cancelar'          
        }).then((result) => {            
            if (result.value) {                 
                // llamado a axios                
                clienteAxios.delete(`/pedidos/${id}`)                
                .then(res => {                    
                    Swal.fire(                    
                        'Eliminado!',                    
                        res.data.msj,                    
                        'success'                    
                    )                
                })            
            }          
        })    
    }
    
    return (
        <li className="pedido">
            <div className="info-pedido">
                <p className="id">ID: 0192019201291201</p>
                <p className="nombre">Cliente: {cliente.nombre} {cliente.apellido}</p>
                <div className="articulos-pedido">
                    <p className="productos">Artículos Pedido: </p>
                    <ul>
                        {pedido.pedido.map(articulo => (
                            <li key={pedido._id+articulo.producto._id}>
                                <p>{articulo.producto.nombre}</p>
                                <p>Precio: ${articulo.producto.precio}</p>
                                <p>Cantidad: {articulo.cantidad}</p>
                            </li>
                        ))}
                    </ul>
                </div>
                <p className="total">Total: ${pedido.total} </p>
            </div>
            <div className="acciones">
                <button type="button" className="btn btn-rojo btn-eliminar" onClick={ () => eliminarPedido(pedido._id) }>
                    <i className="fas fa-times"></i>
                    Eliminar Pedido
                </button>
            </div>
        </li>
    );
}

export default DetallesPedido;
