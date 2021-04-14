import React, { Fragment } from 'react'

/***COMPONESTES***/
//Layout
import Header from './components/layout/Header';

function App(){ //dentro del return es jsx por lo cual se comenta distinto
  return(
    <Fragment> {/* */}
      <Header />{/*forma de realizar el renderizado de un componente*/}
    </Fragment>
  )
}

export default App;
