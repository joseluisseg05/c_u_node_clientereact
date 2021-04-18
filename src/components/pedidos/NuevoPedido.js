import React, {useState, useEffect, Fragment } from 'react'
import Swal from 'sweetalert2';

import clienteAxios from '../../config/axios';

import FormBuscar from './FormBuscarProducto';
import FormCantidad from './FormCantidadaProducto';

function NuevoPedido(props) {

    //extraer id de cliente
    const { id } = props.match.params;

    const [cliente, guardarCliente] = useState({});
    const [busqueda, guardarBusqueda] = useState('');
    const [productos, guardarProductos] = useState([]);
    
    useEffect( ()=> {
        //obtener cliente
        const consultarAPI = async() => {
            const resultado = await clienteAxios.get(`/clientes/${id}`);
            guardarCliente(resultado.data.cliente);
        }

        consultarAPI();
    }, []);

    const buscarProducto = async e => {
        e.preventDefault();
        //obtener los productos de la busqueda
        const resultadosBusqueda = await clienteAxios.post(`/productos/busqueda/${busqueda}`);

        if(resultadosBusqueda.data.producto[0]){ //obtiene el primer resultado de la busqueda
            let productoResul = resultadosBusqueda.data.producto[0];

            productoResul.producto = resultadosBusqueda.data.producto[0]._id;
            productoResul.cantidad = 0;

            guardarProductos([
                ...productos, //copia de los productos
                productoResul//lo que se va a agregar al state
            ])
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'No hay resulados para esta busqueda'
            })
        }
        //console.log(resultadosBusqueda)
    }

    //almacenar la busqueda en el state
    const leerDatosBusqueda = e => {
        guardarBusqueda( e.target.value ); //obtiene el valor de la caja de texto 
    }

    return (
        <Fragment>
            <h2>Nuevo Pedido</h2>
            <div className="ficha-cliente">
                <h3>Datos de Cliente</h3>
                <p>Nombre: {cliente.nombre} {cliente.apellido}</p>
                <p>Telefono: {cliente.telefono}</p>
            </div>
            
            <FormBuscar
                buscarProducto={buscarProducto}
                leerDatosBusqueda={leerDatosBusqueda}
            />

            <ul className="resumen">
                {productos.map((producto, index) => (
                    <FormCantidad 
                        key={producto.producto}
                        producto={producto}
                    />
                ))}
            </ul>
            <div className="campo">
                <label>Total:</label>
                <input type="number" name="precio" placeholder="Precio" readonly="readonly" />
            </div>
            <div className="enviar">
                <input type="submit" className="btn btn-azul" value="Agregar Pedido" />
            </div>
        </Fragment>
    )
}

export default NuevoPedido;