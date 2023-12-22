// Footer.js
import React, { useEffect, useState } from 'react';
import '../LandingPage/styles.css';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';


function LandingPage() {

  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const jwtToken = Cookies.get('jwtToken');

    if (jwtToken) {
      setIsLoggedIn(true);
      navigate('/perfil');
    } else {
      setIsLoggedIn(false);
      navigate('/login');
    }
  }, []);
  return (
    <div className='center-content'>
      {isLoggedIn && (
        <div></div>
      )}
    </div>
  );
}

export default LandingPage;
