import React, { useEffect, useState, Fragment } from 'react';
import { Link } from 'react-router-dom';

import clienteAxios from '../../config/axios';
import Cliente from './Cliente';

function Clientes() {

  //trabajar con state
  //resultado de la api en la primera parte(clientes) 
  //reescribir el state segunda parte
  const [clientes, guardarClientes] = useState([]);//([]); valor iniciar como se espera un arreglo

  //Query API
  const consultarAPI = async () => {
    const clientesConsulta = await clienteAxios.get('/clientes');
    //console.log(clientesConsulta.data.clientes);
    //colocar resul en state
    guardarClientes(clientesConsulta.data.clientes);
  }

  useEffect( ()=> { //se carga automaticamente al cargar la pagina 
    consultarAPI()//separara metodos para buenas practicas 
  }, [clientes]);//cuando clientes cambie se ejecuta

  return (
    <Fragment>
      <h2>Clientes</h2>
      
      <Link to="/clientes/nuevo" className="btn btn-verde nvo-cliente"> 
        <i className="fas fa-plus-circle"></i>
        Nuevo Cliente
      </Link>

      <ul className="listado-clientes">
        {
          clientes.map(cliente => (
            <Cliente
              key={cliente._id}
              cliente={cliente}//props
            />
          ))
        }
      </ul>
    </Fragment>
  )
}

export default Clientes;