import React, { Fragment, useState } from 'react';
import Swal from 'sweetalert2';
import { withRouter } from 'react-router-dom'

import clienteAxios from '../../config/axios';

function NuevoCliente({history}) {//permite redirreccionar

    const [cliente, guardarCliente ] = useState({ // iniciaralizar {} porque es un objeto
        nombre: '',
        apellido: '',
        empresa: '',
        email: '',
        telefono: ''
    })

    const actualizarState = e => {
        //almacena lo que el usuario escribe
        guardarCliente({
            //obtener una copia del state act
            ...cliente,//concervar los valores previos 
            [e.target.name]: e.target.value//identificador del input y su valor(lo que se escribe)
        })
    }

    const agregarCliente = e => {
        e.preventDefault();

        //enviar peticion
        clienteAxios.post('/clientes', cliente)
        .then(res => {
            //console.log(res);
            if(res.data.code === 11000) { // error de mongo
                //console.log('error de dublicado') //error
                Swal.fire({
                    type: 'error',
                    title: 'Oops...',
                    text: 'Ya existe un cliente ligado a ese correo'
                })
            } else {
                Swal.fire(
                    'Exito!',
                    res.data.msj, //msj propiedad de la respuesta del back
                    'success'
                )
                //console.log(res.data); //ok
            }
            history.push('/');//redireccion
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
            <h2>Nuevo Cliente</h2>
            <form onSubmit={agregarCliente}>
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input 
                        type="text" 
                        placeholder="Nombre Cliente" 
                        name="nombre"
                        onChange={actualizarState} 
                    />
                </div>

                <div className="campo">
                    <label>Apellido:</label>
                    <input 
                        type="text" 
                        placeholder="Apellido Cliente" 
                        name="apellido" 
                        onChange={actualizarState}
                    />
                </div>
            
                <div className="campo">
                    <label>Empresa:</label>
                    <input 
                        type="text" 
                        placeholder="Empresa Cliente" 
                        name="empresa" 
                        onChange={actualizarState}
                    />
                </div>

                <div className="campo">
                    <label>Email:</label>
                    <input 
                        type="email" 
                        placeholder="Email Cliente" 
                        name="email" 
                        onChange={actualizarState}
                    />
                </div>

                <div className="campo">
                    <label>Teléfono:</label>
                    <input 
                        type="tel" 
                        placeholder="Teléfono Cliente" 
                        name="telefono" 
                        onChange={actualizarState}
                    />
                </div>

                <div className="enviar">
                    <input 
                        type="submit" 
                        className="btn btn-azul" 
                        value="Agregar Cliente" 
                        disabled={ validarCliente() }
                    />
                </div>

            </form>
        </Fragment>
    )
}

//HOC funcion que toma un componente y retorna otro
export default withRouter(NuevoCliente);