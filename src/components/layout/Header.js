import React from 'react'

{/* Forma de poner un comentario en JSX */}

{/*
// para la creacion de un componente puede ser :
    const Header = () => {
        return (<h1>Hola</h1>)
    }
// o
    const Header = () => (
        <h1>Hola</h1>
    )
    
*/}

const Header = () => {
    return (
        <header className="barra"> {/* Para las clases de css en jsx se debe de llamar className*/}
            <div className="contenedor">
                <h1>CRM - Administrador de Clientes</h1>
            </div>
        </header>
    )
}

export default Header;