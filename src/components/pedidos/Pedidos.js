import React, {useEffect, useState, Fragment} from 'react';
import clienteAxios from '../../config/axios';
import DetallesPedido from './DetallesPedido';

function Pedidos() {

  const [pedidos, guardarPedidos] = useState([]);
  
  useEffect( ()=> {
    const consultarAPI = async () => {
      //obtener pediodos 
      const resultados = await clienteAxios.get('/pedidos');
      //console.log(resultados)
      guardarPedidos(resultados.data.pedidos);
    }

    consultarAPI()
  }, [])

  return (
    <Fragment>
      <h2>Pedidos</h2>
      <ul className="listado-pedidos">
        {pedidos.map(pedido => (
          <DetallesPedido
            key={pedido._id}
            pedido={pedido}
          />
        ))}
      </ul>
    </Fragment>
  )
}

export default Pedidos;