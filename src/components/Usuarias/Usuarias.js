import './Usuarias.css'; // Importa el archivo de estilos CSS
import { get_users} from '../../api';
import React, { useEffect, useState } from 'react';
//import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';


function Perfil() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [datos, setDatos] = useState([]);
    // const navigate = useNavigate();
  
    
    useEffect(() => {
      const jwtToken = Cookies.get('jwtToken');
      if (jwtToken) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    }, []);
  
    useEffect(() => {
      mostrarUsers();
    }, []);
  
    const mostrarUsers = async () => {
      try {
        const jwtToken = Cookies.get('jwtToken');
        // const user_id = Cookies.get('userId');
        const response = await get_users(jwtToken);
        const responseData = await response.json();

        setDatos(responseData);

      } catch (error) {
        console.error('Error:', error);
      }
    };
    
  
  return (
    <>
      <div className="div_usuarias">
        <h1>Usuarias</h1>
        {isLoggedIn && (
          <div>
              {datos.map((dato, index) => (
                      <div key={index} className="rectangulo-pink">
                          <h2>Nombre: {dato.nombre} {dato.apellido}</h2>
                          <h3 className='clase-email'>Email: {dato.mail}</h3>
                          <button className="button-rosadoo">Ver Perfil</button>
                          <button className="button-ros">Seguir</button>
                          <p></p>
                      </div>
                  ))}
          </div>
        )}
      </div><div>
      </div>
    </>
  );
  }
  
  
  
  export default Perfil;