import React, { useState, useEffect, Fragment } from 'react'
import Swal from 'sweetalert2';
import { withRouter } from 'react-router-dom'

import clienteAxios from '../../config/axios';
import Spinner from '../layout/Spinner';

function EditarProducto(props) {
    const { id } = props.match.params;
    
    const [producto, guardarProducto] = useState({
        nombre: '',
        precio: '',
        imagen: ''
    })

    const [archivo, guardarArchivo] = useState('');

    //consultar api
    const consultarAPI = async() => {
        const productoConsulta = await clienteAxios.get(`/productos/${id}`);
        guardarProducto(productoConsulta.data.producto);
    }

    useEffect( () => {
        consultarAPI();
    }, [])

    //leer data del form 
    const leerInformacion = e => {
        guardarProducto({
            ...producto,
            [e.target.name]: e.target.value
        })
    }

    const leerArchivo = e => {
        guardarArchivo(e.target.files[0])//obtinen la informacion del archivo 
        //console.log(e.target.files)
    }

    const { nombre, precio, imagen } = producto

    if(!nombre ) return <Spinner/>

    const actualizarProducto = async e => {
        e.preventDefault();

        //formdata subir archivos 
        const formData = new FormData();
        formData.append('nombre', producto.nombre);
        formData.append('precio', producto.precio);
        formData.append('imagen', archivo);

        try {
            const res = await clienteAxios.put(`/productos/${id}`, formData, {
                headers:{
                    'Content-Type': 'multipart/form-data'
                }
            })

            if (res.status === 200) {
                Swal.fire(
                    'Exito!',
                    'Producto Actualizado',
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

    return (
        <Fragment>
            <h2>Editar Producto</h2>
            <form onSubmit={actualizarProducto}>
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input 
                        type="text" 
                        placeholder="Nombre Producto" 
                        name="nombre" 
                        onChange={leerInformacion}
                        defaultValue={nombre}
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
                        defaultValue={precio}
                    />
                </div>
                
                <div className="campo">
                    <label>Imagen:</label>
                    {
                        imagen ? ( //si hay imagen la busca en el servidor
                            <img src={`http://localhost:8080/${imagen}`} alt={nombre} width='300'/>
                            //en caso contrario no regresa nada 
                        ) : null
                    }
                    <input type="file"  name="imagen" onChange={leerArchivo}/>
                </div>

                <div className="enviar">
                    <input type="submit" className="btn btn-azul" value="Guardar Cambios" />
                </div>
            </form>
        </Fragment>
    )
}

export default withRouter(EditarProducto);