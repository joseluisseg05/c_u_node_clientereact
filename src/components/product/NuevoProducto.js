import React, { Fragment, useState } from 'react'
import Swal from 'sweetalert2';
import { withRouter } from 'react-router-dom'

import clienteAxios from '../../config/axios';

function NuevoProducto(props) {

    const [producto, gruardarProducto ] = useState({
        nombre: '',
        precio: ''
    })

    const [archivo, guardarArchivo] = useState('');

    const agregarProducto = async e => {
        e.preventDefault();

        //formdata subir archivos 
        const formData = new FormData();
        formData.append('nombre', producto.nombre);
        formData.append('precio', producto.precio);
        formData.append('imagen', archivo);

        try {
            const res = await clienteAxios.post('/productos', formData, {
                headers:{
                    'Content-Type': 'multipart/form-data'
                }
            })

            if (res.status === 200) {
                Swal.fire(
                    'Exito!',
                    res.data.msj, //msj propiedad de la respuesta del back
                    'success'
                )
            }
            props.history.push('/productos')
        } catch (error) {
            console.log(error);
            Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: 'Hubo un error, vuele a intentarlo'
            })
        }
    }

    //leer data del form 
    const leerInformacion = e => {
        gruardarProducto({
            ...producto,
            [e.target.name]: e.target.value
        })
    }

    const leerArchivo = e => {
        guardarArchivo(e.target.files[0])//obtinen la informacion del archivo 
        //console.log(e.target.files)
    }

    return (
        <Fragment>
            <h2>Nuevo Producto</h2>

            <form onSubmit={agregarProducto}>
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input 
                        type="text" 
                        placeholder="Nombre Producto" 
                        name="nombre" 
                        onChange={leerInformacion}
                    />
                </div>

                <div className="campo">
                    <label>Precio:</label>
                    <input 
                        type="number" 
                        name="precio" 
                        min="0.00" 
                        step="0.01" 
                        placeholder="Precio" 
                        onChange={leerInformacion}
                    />
                </div>
                
                <div className="campo">
                    <label>Imagen:</label>
                    <input type="file"  name="imagen" onChange={leerArchivo}/>
                </div>

                <div className="enviar">
                    <input type="submit" className="btn btn-azul" value="Agregar Producto" />
                </div>
            </form>
        </Fragment>
    )
}

export default withRouter(NuevoProducto);