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
    const [total, guardarTotal] = useState(0);
    
    useEffect( ()=> {
        //obtener cliente
        const consultarAPI = async() => {
            const resultado = await clienteAxios.get(`/clientes/${id}`);
            guardarCliente(resultado.data.cliente);
        }

        consultarAPI();

        actualizarTotal();
    }, [productos]);//cada que productos cambie 

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

    //actualizar cantidad
    const restarProductos = indice => {//indice es la posicion de los productos dentro del state
        const todosProductos = [...productos];//copiar el arreglo original

        //si es 0 no restar mas
        if(todosProductos[indice].cantidad === 0) return;

        todosProductos[indice].cantidad --;//decremento

        guardarProductos(todosProductos)//almacenar
    }
    const aumentarProductos = indice => {
        const todosProductos = [...productos];//copia
        todosProductos[indice].cantidad ++; //incremento
        guardarProductos(todosProductos)//guardar
    }

    //eliminar producto de state
    const eliminarProductoPedido = id => {
        //el producto que se quire eliminar se quita del state manteniendo todos los demas 
        const todosProductos = productos.filter(producto=> producto.producto !== id);
        guardarProductos(todosProductos)
    }

    //actualizar total 
    const actualizarTotal = ()=> {
        if(productos.length === 0) {
            guardarTotal(0);
            return;
        }

        //calcular nuevo total
        let nuevoTotal = 0;
        //acceder a los productos
        productos.map(producto => nuevoTotal += (producto.cantidad * producto.precio));

        guardarTotal(nuevoTotal);
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
                        restarProductos={restarProductos}
                        aumentarProductos={aumentarProductos}
                        eliminarProductoPedido={eliminarProductoPedido}
                        index={index}
                    />
                ))}
            </ul>
           <p className="total">Total a Pagar: <span>${total}</span></p>
            {
                total > 0 ? (
                    <form>
                        <input 
                            type="submit"
                            className="btn btn-verde btn-block"
                            value="Realizar Pedido"
                        />
                    </form>
                ) : null
            }
        </Fragment>
    )
}

export default NuevoPedido;