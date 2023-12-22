import React from 'react';
import Box from '@mui/material/Box';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './Notifications.css';
import { dataPersonas, dataComunidades, dataSugerencias } from './Data'
import Solicitudes from './Solicitudes';
import Sugerencias from './Sugerencias';

function Notifications() {
  return( <div className='App'>
            <link href='https://fonts.googleapis.com/css2?family=Montserrat:wght@400&display=swap' rel='stylesheet'></link>
            <link href='https://fonts.googleapis.com/css2?family=Montserrat:wght@800&display=swap' rel='stylesheet'></link>
            <div className='main-container'>
                <div className='left-container'>
                    <Solicitudes nombre={'personas'} data={dataPersonas} />
                    <Solicitudes nombre={'comunidades'} data={dataComunidades} />
                    <Sugerencias nombre={'sugerencias'} data={dataSugerencias} />
                </div>
                <div className='right-container'>
                <Box className='right-box'/>
                </div>
            </div>
            {/* <Footer /> */}
          </div>
  );
}

export default Notifications;
