import React, { Fragment } from 'react'

/***COMPONESTES***/
//Layout
import Header from './components/layout/Header';
import Navegacion from './components/layout/Navegacion';

function App(){ //dentro del return es jsx por lo cual se comenta distinto
  return(
    <Fragment> {/* */}
      <Header />{/*forma de realizar el renderizado de un componente*/}
      <div className="grid contenedor contenido-principal">
        <Navegacion />
        <main class="caja-contenido col-9">
          
        </main>
      </div>
    </Fragment>
  )
}

export default App;
