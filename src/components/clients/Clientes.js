import React, { useEffect } from 'react';

import clienteAxios from '../../config/axios';

function Clientes() {

  const consultarAPI = async () => {
    const clienteConsulta = await clienteAxios.get('/clientes');
    console.log(clienteConsulta)
  }

  useEffect( ()=> { //se carga automaticamente al cargar la pagina 
    consultarAPI()//separara metodos para buenas practicas 
  }, []);//para que se ejecute una vez

  return (
    <h2>Clientes</h2>
  )
}

export default Clientes;