import React, { useState } from 'react';
import Box from '@mui/material/Box';
import LineSeparator from './LineSeparator';
import Entidad from './Entidad';

function Solicitudes({ nombre, data }) {

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
        <div className='solicitud-container'>
            <Box className='solicitud-box' sx={{ height: dataState.length * 100 + 100 }}>
                <div className='box-container'>
                    <h1 className='title-text'>Solicitud {nombre}</h1>
                    {dataState.map((item, index) => {
                        const { nombreItem, seguidores, suscrito } = item;
                        return (
                            <div key={index} style={{ width: '100%' }}>
                                <Entidad tipo={nombre}
                                    nombre={nombreItem}
                                    seguidores={seguidores}
                                    suscrito={suscrito}
                                    eliminar={() => eliminarItem(index)}
                                    cambiarSuscrito={() => cambiarSuscrito(index)} />
                                {index !== dataState.length - 1 && <LineSeparator />}
                            </div>
                        );
                    })}
                </div>
            </Box>
        </div>
    );
}

export default Solicitudes;
