import React, { useEffect, useState } from 'react';
import '../Header/styles.css';
import { Link, NavLink } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import {FaBell} from 'react-icons/fa';
import {LuLogOut} from 'react-icons/lu';
import { ReactComponent as ComunnitiesIcon } from './icons/communities_icon.svg';
import { ReactComponent as ProfileIcon } from './icons/profile_icon.svg';
import { ReactComponent as HomeIcon } from './icons/home_icon.svg';



function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [color, setColor] = useState("blue");
  useEffect(() => {
    const jwtToken = Cookies.get('jwtToken');
    if (jwtToken) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    Cookies.remove('jwtToken');
    navigate('/login');
  }

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <><link href='https://fonts.googleapis.com/css2?family=Montserrat:wght@400&display=swap' rel='stylesheet'></link><link href='https://fonts.googleapis.com/css2?family=Montserrat:wght@400&display=swap' rel='stylesheet'></link><header>
      <Link to="/">
        <img className="logo" src="/images/logo.svg" width="150" />
      </Link>
      <nav className='header_navigation'>
        <ul>
          <li>
            <a href="/" className="navlink">
              <div className="icon-container">
                <HomeIcon className='navbar_icon' />
                <span className="navlink-text">Inicio</span>
              </div>
            </a>
          </li>
          <li>
            <a href="/comunidades" className="navlink">
              <div className="icon-container">
                <ComunnitiesIcon className='communities_icon' />
                <span className="navlink-text">Comunidades</span>
              </div>
            </a>
          </li>
          {isLoggedIn && (
            <>
              <li>
                <a href="/notificaciones" className="navlink">
                  <div className="icon-container">
                    <FaBell className='navlink_icon' />
                    <span className="navlink-text">Notificaciones</span>
                  </div>
                </a>
              </li>
              <li>
                <a href="/perfil" className="navlink">
                  <div className="icon-container">
                    <ProfileIcon className="profile_icon" />
                    <span className="navlink-text">Perfil</span>
                  </div>
                </a>
              </li>
              <li>
                <a className="navlink" onClick={handleLogout}>
                  <div className="icon-container">
                    <LuLogOut className='navlink_icon' size={26} />
                    <span className="navlink-text">Cerrar Sesión</span>
                  </div>
                </a>
              </li>
            </>
          )}
          {!isLoggedIn && (
            <li>
              <button className='login_button' onClick={handleLogin}>
                Ingresa
              </button>
            </li>
          )}
        </ul>
      </nav>
    </header></>
  );
}

export default Header;
