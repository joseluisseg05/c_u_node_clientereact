import React, { Fragment, useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { withRouter } from 'react-router-dom'

import clienteAxios from '../../config/axios';

function EditarCliente(props) {
    //obtener el id
    const { id } = props.match.params;

    const [cliente, datosCliente ] = useState({ // iniciaralizar {} porque es un objeto
        nombre: '',
        apellido: '',
        empresa: '',
        email: '',
        telefono: ''
    })

    //Query API
    const consultarAPI = async () => {
        const clienteConsulta = await clienteAxios.get(`/clientes/${id}`, cliente);
        
        datosCliente(clienteConsulta.data.cliente);//data.cliente (cliente) viene el back
    }

    //useEffect, cuando el componente carga
    useEffect( () => {
        consultarAPI();
    }, [])

    const actualizarState = e => {
        //almacena lo que el usuario escribe
        datosCliente({
            //obtener una copia del state act
            ...cliente,//concervar los valores previos 
            [e.target.name]: e.target.value//identificador del input y su valor(lo que se escribe)
        })
    }

    //peticion por axios
    const actualizarCliente = e => {
        e.preventDefault();

        clienteAxios.put(`/clientes/${cliente._id}`, cliente).then( res => {
            if(res.data.code === 11000) { //por se cambian el correo
                Swal.fire({
                    type: 'error',
                    title: 'Oops...',
                    text: 'Ya existe un cliente ligado a ese correo'
                })
            } else {
                Swal.fire(
                    'Exito!',
                    'Se actualizo los datos del Cliente',
                    'success'
                )
            }
            //redireccion
            props.history.push('/')
        })
    }

    //validar cliente
    const validarCliente = () => {
        //desestructuracion
        const { nombre, apellido, email, empresa, telefono } = cliente;

        //revizar las propiedades del state
        let valido = !nombre.length || !apellido.length || !email.length || !empresa.length || !telefono.length;
        
        return valido;
    }

    return (
        <Fragment>
            <h2>Editar Cliente</h2>
            <form onSubmit={actualizarCliente}>
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input 
                        type="text" 
                        placeholder="Nombre Cliente" 
                        name="nombre"
                        onChange={actualizarState} 
                        value={cliente.nombre}
                    />
                </div>

                <div className="campo">
                    <label>Apellido:</label>
                    <input 
                        type="text" 
                        placeholder="Apellido Cliente" 
                        name="apellido" 
                        onChange={actualizarState}
                        value={cliente.apellido}
                    />
                </div>
            
                <div className="campo">
                    <label>Empresa:</label>
                    <input 
                        type="text" 
                        placeholder="Empresa Cliente" 
                        name="empresa" 
                        onChange={actualizarState}
                        value={cliente.empresa}
                    />
                </div>

                <div className="campo">
                    <label>Email:</label>
                    <input 
                        type="email" 
                        placeholder="Email Cliente" 
                        name="email" 
                        onChange={actualizarState}
                        value={cliente.email}
                    />
                </div>

                <div className="campo">
                    <label>Teléfono:</label>
                    <input 
                        type="tel" 
                        placeholder="Teléfono Cliente" 
                        name="telefono" 
                        onChange={actualizarState}
                        value={cliente.telefono}
                    />
                </div>

                <div className="enviar">
                    <input 
                        type="submit" 
                        className="btn btn-azul" 
                        value="Guardar Cambios" 
                        disabled={ validarCliente() }
                    />
                </div>

            </form>
        </Fragment>
    )
}

//HOC funcion que toma un componente y retorna otro
export default withRouter(EditarCliente);