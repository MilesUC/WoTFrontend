import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import LandingPage from './components/LandingPage/LandingPage';
import Login from './components/Login/Login';
import Registro from './components/Registro/Registro';
import Perfil from './components/Perfil/Perfil';
import Comunidad from './components/Comunidad/Comunidad';
import Comunidades from './components/Comunidades/Comunidades';
import ComunidadesAntiguo from './components/ComunidadesAntiguo/ComunidadesAntiguo';

import Usuarias from './components/Usuarias/Usuarias';
import Notifications from './components/Notifications/Notifications';

function Home() {
  return( <div className='App'>
            <Header />
            <LandingPage />
          </div>
  );
}

function Reg() {
  return( <div className='App'>
            <Registro />
          </div>
  );
}

function Log() {
  return( <div className='App'>
            <Login />
          </div>
  );
}

function Pf() {
  return( <div className='App'>
            <Header />
            <Perfil />
          </div>
  );
}

function Com() {
  return( <div className='App'>
            <Header />
            <Comunidades />
          </div>
  );
}

function IndCom() {
  return( <div className='App'>
            <Header />
            <Comunidad />
          </div>
  );
}


function ComAntiguo() {
  return( <div className='App'>
            <Header />
            <ComunidadesAntiguo />
          </div>
  );
}

function Users() {
  return( <div className='App'>
            <Header />
            <Usuarias />
          </div>
  );
}


function Noti() {
  return( <div className='App'>
            <Header />
            <Notifications />
          </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Log />} />
        <Route path="/registro" element={<Reg />} />
        <Route path="/perfil" element={<Pf />} />
        <Route path="/comunidades" element={<Com />} />
        <Route path="/comunidades_antiguo" element={<ComAntiguo />} />
        <Route path="/usuarias" element={<Users />} />
        <Route path="/notificaciones" element={<Noti />} />
        <Route path="/comunidad/:communityId" element={<IndCom />} />
      </Routes>
    </Router>

  );
}

export default App;
