// Footer.js
import React, { useEffect, useState } from 'react';
import './styles.css';
import Cookies from 'js-cookie';
import {get_community, get_communities, join_community, get_user_communities} from '../../api';
import Modal from 'react-modal';
import { Link, useNavigate } from 'react-router-dom';


import MenuItem from '@mui/material/MenuItem';

import Select from '@mui/material/Select';


import ajustes1 from "./imagenes/ajustes 1.png";
import mujer2 from "./imagenes/mujer 2.png";
import imagen1 from "./imagenes/imagen 1.png";
import captura2 from "./imagenes/Captura2.png";

import { useParams } from 'react-router-dom';


function Comunidad() {

  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMember, setIsMember] = useState(false);


  const [community, setCommunity] = useState([]);
  const [communities, setCommunities] = useState([]);


  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [activeInfo, setActiveInfo] = useState(1);

  const { communityId } = useParams();


  const handleInfoChange = (infoNumber) => {
    setActiveInfo(infoNumber);
  };

  useEffect(() => {
    const jwtToken = Cookies.get('jwtToken');
    if (jwtToken) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  useEffect(() => {
    // Fetch data when the component mounts
    console.log(communityId);
    fetchCommunity(communityId);
    fetchCommunities();
    fetchIsMember();
  }, []);

  const fetchCommunity = async (communityId) => {
    try {
      // Make a GET request to your API endpoint
      const token = Cookies.get('jwtToken');
      const response = await get_community(token, communityId);
      const responseData = await response.data;
      setCommunity(responseData);
      console.log(community);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchCommunities = async () => {
    try {
      // Make a GET request to your API endpoint
      const token = Cookies.get('jwtToken');
      const response = await get_communities(token);
      const responseData = await response.data;
      console.log(responseData);
      setCommunities(responseData.reverse());
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleCommunityClick = (communityId) => {
    navigate(`/comunidad/${communityId}`);
  };


  const handleJoinClick = async (community_id) => {
    try {
      const token = Cookies.get('jwtToken');
      let response = await join_community(token, community_id);
      if (response.status === 200) {
        try {
          // Make a GET request to your API endpoint
          const response = await get_communities(token);
          const responseData = await response.data;
          setCommunities(responseData.reverse());
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    } catch (error) {
      alert('Error al seguir la comunidad');
      console.error(error);
    }
  };

  const fetchIsMember = async () => {
    try {
      // Make a GET request to your API endpoint
      const token = Cookies.get('jwtToken');
      const response = await get_user_communities(token);
      const responseData = await response.data;
      console.log(responseData);
      for (let own_community of responseData.otherCommunities){
        if (own_community.id == community.id){
          setIsMember(true);
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  return (
    <><div className='div_profile'>
    {isLoggedIn && (
      <div className="desktop">

      <div className="div">
        <div className="overlap-group">
          <div className="rectangulo_principal">

            <div className="flex-container">
              <div className="group" ></div>
              <div className="rectangle-fucsia" ></div>
            </div>
            <div className="rectangulo_seccion">
              <p className="nombre-apellido">{community.name}</p>
              {community.descripcion != null && <p className="sobre-ti">Email: {community.description}</p>}

              <p className="element-contactos">{community.followers} miembros</p>
              <div className="flex-container">
                {!isMember &&(
                  <button onClick={() => setModalIsOpen(true)} className="button_rosa">Unirte al grupo</button>
                )}
                {isMember &&(
                  <button className="button_rosa">Miembro</button>
                )}
                <button className="button_collapse">
                  <img src='/images/Vector_up.svg'/>
                </button>
              </div>

              <p></p>
              <div className="linea_gris"></div>
            </div>
            
            <div className="rectangle_gris"></div>


            <div className="linea_rosa"></div>
            <div className="linea_rosa_corta"></div>
            <div className="elipse-fucsia"></div>

            <div className="community_rectangulo_seccion">
              <div className='enclosing_div_community'>
                <div className='row'>
                  <h1 className='other_communities_section_title'>Grupos relacionados</h1>
                </div>
                <div className='row'>
                  <div className='community-other-communities-container'>
                      {communities.map((community) => (
                        <div className='community_other_community_div'>
                          <img src='/images/cancel_icon.svg' className='recommended_community_cancel_icon'/>
                          <h1 className='community_other_community_title'>{community.name}</h1>
                          <h3 className='community_community_other_info'>15 mil miembros  -  10+
                          publicaciones al día </h3>
                          <div className='row'>
                            <button className='community_join_badge' onClick={() => handleJoinClick(community.id)}>Unirse</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                <div className="linea_gris"></div>
              </div>
            </div>

          <div className="rectangulo_seccion">          
            <div className="horizontal-bar">
              
              <button onClick={() => handleInfoChange(1)} className={activeInfo === 1 ? "button-activate" : "button-inactivate"}>
                Conversación
              </button>

              <button onClick={() => handleInfoChange(2)} className={activeInfo === 2 ? "button-activate" : "button-inactivate"}>
                Destacados
              </button>

              <button onClick={() => handleInfoChange(3)} className={activeInfo === 3 ? "button-activate" : "button-inactivate"}>
                Personas
              </button>

              <button onClick={() => handleInfoChange(4)} className={activeInfo === 4 ? "button-activate" : "button-inactivate"}>
                Eventos
              </button>

              <button onClick={() => handleInfoChange(5)} className={activeInfo === 5 ? "button-activate" : "button-inactivate"}>
                Multimedia
              </button>

              <div className="linea_gris_buttons"></div>
            </div>
          </div>
          {activeInfo === 1 && (
            <div className="info-container">
              <div className='contenedor-mayor'>
                <div className="flex-container"> 
                  <div className='row publication_comment'>
                    <div className='col'>
                      <img src='/images/mujer.png' className='comment_profile_img'/>
                    </div>
                    <div className='col'>
                      <form className='box comment_form'>
                        <input className='community_publication_comment_input' placeholder='Escribe algo...'/>
                      </form>
                    </div>
                  </div>
                </div>
                <div className='linea-gris-mediana'></div>
              </div>
            </div>)} 
          <div className="rectangulo_seccion">          
            <div className="horizontal-bar">
              
              <button onClick={() => handleInfoChange(6)} className={activeInfo === 1 ? "button-activate" : "button-inactivate"}>
                Publicación Anónima
              </button>

              <button onClick={() => handleInfoChange(7)} className={activeInfo === 2 ? "button-activate" : "button-inactivate"}>
                Foto/Video
              </button>

              <button onClick={() => handleInfoChange(8)} className={activeInfo === 3 ? "button-activate" : "button-inactivate"}>
                Encuesta
              </button>

              <div className="linea_gris_buttons"></div>
            </div>
          </div>
        </div>
        <div className="community-rectangulo-arriba">

          <div className='row'>
            <div className='col'>
              <img src='/images/empty_ellipse.svg' className='right_col_image_ellipse'/>
            </div>
            <div className='col details_community_right_col'>
              <p className="single_community_name">{community.name}</p>
              <p className="single_community_followers"> Grupo público - {community.followers} miembros</p>
            </div>
          </div>

            <div className="flex-container">
            </div>
            
            <button className="button-seecommunity">
              <div className='row'>
                <div className='col'>
                  <img src='/images/home_icon.svg' className='community_home_icon'/>
                </div>
                <div className='col'>
                  <h4 className='community_info_button_title'>Inicio de la comunidad</h4>
                  <h6 className='community_info_button_subtitle'>5 publicaciones</h6>
                </div>
                <div className='col'>
                  <img src='/images/number_publications.svg' className='community_number_publications_icon'/>
                </div>
              </div>
            </button>
            <button className='community_invite_button'>
              Invitar
            </button>
            <div className='community_sub_info'>
              <div className='row'>
                <h1 className='community_left_block_subtitle'>Información</h1>
              </div>
              <div className='row'>
                <p className='community_left_block_text'>{community.description}</p>
              </div>
              <div className='row'>
                <h1 className='community_left_block_subtitle'>Privado</h1>
              </div>
              <div className='row'>
                <p className='community_left_block_text'>Este grupo es de discusión general para egresados de la Universidad Adolfo Ibáñez 
                (tanto Viña como Santiago).</p>
              </div>
              <div className='row'>
                <h1 className='community_left_block_subtitle'>Visible</h1>
              </div>
              <div className='row'>
                <p className='community_left_block_text'>Cualquier persona puede encontrar este grupo.</p>
              </div>
              <div className='row'>
                <h1 className='community_left_block_subtitle'>Puede incluir contenido marcado</h1>
              </div>
              <div className='row'>
                <p className='community_left_block_text'>Es posible que los administradores permitan que algunas publicaciones y comentarios se muestren
                en el grupo aunque estén marcados por los sistemas de WOT. </p>
              </div>
              <button className='community_more_information_button'>
                Mas información
              </button>
            </div>
          </div>
        </div>
      </div>
      </div>
      )}
    </div></>
  );
  
}

export default Comunidad;
