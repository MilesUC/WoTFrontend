import React from 'react';
import Button from '@mui/material/Button';
import { botonSuscritoStyle, botonNoSuscritoStyle } from './MuiStyles';

function Entidad({ tipo, nombre, seguidores, suscrito, eliminar, cambiarSuscrito }) {

    const conditionalText = tipo === 'personas' ? (suscrito ? 'Seguido' : 'Seguir') : (suscrito ? 'Miembro' : 'Unirse');

    return (
        <div className='entidad-container'>
            <div className='informacion-container'>
                <div className='circulo-imagen-entidad'>
                    {tipo === 'comunidades' ? <img src={require('./comunity.png')} alt='Imagen-entidad' className='imagen' /> : <></>}
                </div>
                <div className='texto-container'>
                    <h1 className='nombre-text'>{nombre}</h1>
                    <h1 className='seguidores-text'>{seguidores.toLocaleString()} seguidores</h1>
                    <Button variant="outlined"
                        onClick={() => cambiarSuscrito()}
                        style={suscrito ? botonSuscritoStyle : botonNoSuscritoStyle}>{conditionalText}
                    </Button>
                </div>
            </div>
            <button className='boton-desuscribir' onClick={() => eliminar()}>
                <span className='x-text'>X</span>
            </button>
        </div>
    );
}

export default Entidad;