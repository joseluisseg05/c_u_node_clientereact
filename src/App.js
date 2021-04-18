import React, { Fragment } from 'react'

//routing
import { BrowserRouter as RouterBrow, Route, Switch } from 'react-router-dom'

/***COMPONESTES***/
//Layout
import Header from './components/layout/Header';
import Navegacion from './components/layout/Navegacion';

//clientes
import Clientes from './components/clients/Clientes';
import NuevoCliente from './components/clients/nuevoCliente';
import EditarCliente from './components/clients/EditarCliente';

//productos
import Productos from './components/product/Productos';
import NuevoProducto from './components/product/NuevoProducto';
import EditarProducto from './components/product/EditarProducto';

//pedidos
import Pedidos from './components/pedidos/Pedidos';
import NuevoPedido from './components/pedidos/NuevoPedido';

function App(){ //dentro del return es jsx por lo cual se comenta distinto
  return(
    <RouterBrow>
      <Fragment> {/* */}
        <Header />{/*forma de realizar el renderizado de un componente*/}
        <div className="grid contenedor contenido-principal">
          <Navegacion />
          <main className="caja-contenido col-9">
            <Switch> {/* lugar en donde poner las rutas */}
              <Route exact path="/" component={Clientes} /> {/* Ruta */}
              <Route exact path="/clientes/nuevo" component={NuevoCliente} />
              <Route exact path="/clientes/editar/:id" component={EditarCliente} />

              <Route exact path="/productos" component={Productos} />
              <Route exact path="/productos/nuevo" component={NuevoProducto} />
              <Route exact path="/productos/editar/:id" component={EditarProducto} />

              <Route exact path="/pedidos" component={Pedidos} />
              <Route exact path="/pedidos/nuevo/:id" component={NuevoPedido} />

            </Switch>
          </main>
        </div>
      </Fragment>
    </RouterBrow>
  )
}

export default App;
