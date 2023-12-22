import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Ficha from './Ficha';

function Sugerencias({ nombre, data }) {

    const [dataState, setDataState] = useState(data);

    function eliminarItem(index) {
        const newData = [...dataState];
        newData.splice(index, 1);
        setDataState(newData);
    }

    function cambiarSuscrito(index) {
        const newData = [...dataState];
        newData[index].suscrito = !newData[index].suscrito;
        setDataState(newData);
    }

    return (
        <div className='sugerencias-container'>
            <Box className='sugerencias-box'>
                <div className='box-container'>
                    <h1 className='title-text'>Sugerencias</h1>
                    <div className='sugerencias-container'>
                        {dataState.map((item, index) => {
                            const { nombreItem, contactos, suscrito } = item;
                            return (
                                <div key={index}>
                                    <Ficha
                                        nombre={nombreItem}
                                        contactos={contactos}
                                        texto={nombre === 'personas' ? 'Seguir' : 'Unirse'}
                                        suscrito={suscrito}
                                        eliminar={() => eliminarItem(index)}
                                        cambiarSuscrito={() => cambiarSuscrito(index)} />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </Box>
        </div>
    );
}

export default Sugerencias;