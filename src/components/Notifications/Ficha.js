import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import './Notifications.css';
import { botonSuscritoStyle, botonNoSuscritoStyle} from './MuiStyles'

function Ficha ({tipo, nombre, contactos, suscrito, eliminar, cambiarSuscrito}){
    var conditionalText = tipo === 'personas' ?
     (suscrito ? 'Seguido' : 'Seguir') :
     (suscrito ? 'Miembro' : 'Unirse');

    return (
        <Box className='ficha-box'>
        <div className='container'>
            <button className='boton-desuscribir boton-desuscribir-sugerencias'
                onClick={() => eliminar()}>
                    <span className='x-text'>X</span>
                </button>
            <div className='container'>
                    <div className='circulo-imagen-entidad circulo-imagen-sugerencia'>
                        <img src={require('./comunity.png')} alt='Imagen-sugerencia' className='imagen' />
                    </div>
                    <h1 className='nombre-text'>{nombre}
                </h1>
                <h1 className='seguidores-text'>{contactos.toLocaleString()} contactos en común
                </h1>
                <Button variant="outlined"
                    onClick={() => cambiarSuscrito()} 
                    style={ suscrito ? botonSuscritoStyle : botonNoSuscritoStyle}>
                    {conditionalText}
                </Button>
                </div>
        </div>
        </Box>
    )
}

export default Ficha;