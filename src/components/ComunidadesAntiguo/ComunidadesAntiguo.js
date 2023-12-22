// Footer.js
import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import './styles.css';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import {IoMdCreate} from 'react-icons/io';
import { get_communities, create_community, get_community, get_user_communities,
   delete_community, edit_community, join_community, leave_community} from '../../api';
import { useForm } from "react-hook-form";
import {AiOutlineDown, AiOutlineUp} from 'react-icons/ai';
import {IoMdAdd} from 'react-icons/io';
import {RiSubtractLine} from 'react-icons/ri';
import {MdGroups2, MdDeleteOutline, MdDone, MdCancel} from 'react-icons/md';
import {PiGearDuotone} from 'react-icons/pi';
import {HiOutlineHeart} from 'react-icons/hi'


function ComunidadesAntiguo() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isEditFormVisible, setIsEditFormVisible] = useState({});


  const {register, handleSubmit } = useForm();

  const [communities, setCommunities] = useState([]);
  const [likedCommunities, setLikedCommunities] = useState([]);
  const [yourCommunities, setYourCommunities] = useState([]);

  const [currentCommunity, setCurrentCommunity] = useState();
  const [currentYourCommunity, setCurrentYourCommunity] = useState();


  const [communityVisibility, setCommunityVisibility] = useState({});
  const [collapsedYourCommunities, setCollapsedYourCommunities] = useState(false);
  const [collapsedLikedCommunities, setCollapsedLikedCommunities] = useState(true);
  const [collapsedCommunities, setCollapsedCommunities] = useState(true);
  const [yourCommunityVisibility, setYourCommunityVisibility] = useState({});


  const fetchCommunities = async () => {
    try {
      // Make a GET request to your API endpoint
      const token = Cookies.get('jwtToken');
      const response = await get_communities(token);
      const responseData = await response.data;
      setCommunities(responseData.reverse());
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchYourCommunities = async () => {
    try {
      // Make a GET request to your API endpoint
      const token = Cookies.get('jwtToken');
      const response = await get_user_communities(token);
      const responseData = await response.data;
      setYourCommunities(responseData.ownCommunities.reverse());
      setLikedCommunities(responseData.otherCommunities.reverse());
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchCommunity = async () => {
    try {
      // Make a GET request to your API endpoint
      const token = Cookies.get('jwtToken');
      const response = await get_communities(token);
      const responseData = await response.data;
      setCurrentCommunity(responseData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchYourCommunity = async () => {
    try {
      // Make a GET request to your API endpoint
      const token = Cookies.get('jwtToken');
      const response = await get_communities(token);
      const responseData = await response.data;
      setCurrentYourCommunity(responseData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleCreateClick = () => {
    if (isFormVisible){
      setIsFormVisible(false);
    } else {
      setIsFormVisible(true);
    }
  };

  const handleCloseCreateForm = () => {
    setIsFormVisible(false);
  };

  const handleShowCommunityClick = async (community_id) => {
    try{
      const token = Cookies.get('jwtToken');
      const response = await get_community(token, community_id);
      const responseData = await response.data;
      setCurrentCommunity(responseData);
      toggleCommunityVisibility(community_id);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleShowYourCommunityClick = async (community_id) => {
    try{
      const token = Cookies.get('jwtToken');
      const response = await get_community(token, community_id);
      const responseData = await response.data;
      setCurrentYourCommunity(responseData);
      toggleYourCommunityVisibility(community_id);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const toggleCommunityVisibility = (communityId) => {
    setCommunityVisibility((prevVisibility) => ({
      ...prevVisibility,
      [communityId]: !prevVisibility[communityId], // Toggle visibility
    }));
  };

  const toggleYourCommunityVisibility = (communityId) => {
    setYourCommunityVisibility((prevVisibility) => ({
      ...prevVisibility,
      [communityId]: !prevVisibility[communityId], // Toggle visibility
    }));
  };

  const createSubmit = async (data) => {
    try {
      const token = Cookies.get('jwtToken');
      let response = await create_community(data.titulo, data.descripcion, token);
      if (response.status === 201) {
        window.alert("Comunidad creada exitosamente");
        try {
          // Make a GET request to your API endpoint
          const token = Cookies.get('jwtToken');
          const response = await get_communities(token);
          const responseData = await response.data;
          console.log(responseData);
          setCommunities(responseData.reverse());
          fetchYourCommunities();
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    } catch (error) {
      alert('Error al crear comunidad');
      console.error(error);
    }
  };

  const editSubmit = async (data, communityId) => {
    const confirmed = window.confirm("¿Estas segura de que quieres editar la comunidad?");
    if (confirmed) {
      try {
        const titulo = data[`titulo-${communityId}`];
        const descripcion = data[`descripcion-${communityId}`];
        const token = Cookies.get('jwtToken');
        let response = await edit_community(token, communityId, titulo, descripcion);
        if (response.status === 200) {
          window.alert("Comunidad editada exitosamente");
          try {
            // Make a GET request to your API endpoint
            const token = Cookies.get('jwtToken');
            const response = await get_communities(token);
            const responseData = await response.data;
            setCommunities(responseData.reverse());
            fetchYourCommunities();
            handleShowEditForm(communityId);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        }
      } catch (error) {
        alert('Error al editar la comunidad');
        console.error(error);
      }
    }
  };

  const handleDeleteClick = async (community_id) => {
    const confirmed = window.confirm("¿Estas segura de que quieres eliminar la comunidad?");
    if (confirmed) {
      try {
        const token = Cookies.get('jwtToken');
        let response = await delete_community(token, community_id);
        if (response.status === 204) {
          window.alert("Comunidad eliminada correctamente");
          try {
            // Make a GET request to your API endpoint
            const response = await get_communities(token);
            const responseData = await response.data;
            console.log(responseData);
            setCommunities(responseData.reverse());
            fetchYourCommunities();
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        }
      } catch (error) {
        alert('Error al eliminar comunidad');
        console.error(error);
      }
    }
  };

  const handleShowEditForm = async (community_id) => {
    try{
      const token = Cookies.get('jwtToken');
      const response = await get_community(token, community_id);
      const responseData = await response.data;
      setCurrentYourCommunity(responseData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    if (isFormVisible){
      toggleEditCommunityVisibility(community_id);
    } else {
      toggleEditCommunityVisibility(community_id);
    }
  };

  const toggleEditCommunityVisibility = (communityId) => {
    setIsEditFormVisible((prevVisibility) => ({
      ...prevVisibility,
      [communityId]: !prevVisibility[communityId], // Toggle visibility
    }));
  };

  const showYourComunities = () => {
    if (collapsedYourCommunities){
      setCollapsedYourCommunities(false);
    } else {
      setCollapsedYourCommunities(true);
    }
  };

  const showLikedComunities = () => {
    if (collapsedLikedCommunities){
      setCollapsedLikedCommunities(false);
    } else {
      setCollapsedLikedCommunities(true);
    }
  };

  const showAllComunities = () => {
    if (collapsedCommunities){
      setCollapsedCommunities(false);
    } else {
      setCollapsedCommunities(true);
    }
  };

  function getRandomColor() {
  // Generate random hue value (0-360 degrees)
  const hue = Math.floor(Math.random() * 360);
    
  // Set high saturation and brightness values for neon-like effect
  const saturation = 100; // 100% saturation
  const lightness = 50 + Math.random() * 25; // Vary the lightness between 50% and 75%
  
  // Convert HSL values to RGB
  const hslToRgb = (h, s, l) => {
    h /= 360;
    s /= 100;
    l /= 100;
    let r, g, b;
    
    if (s === 0) {
      r = g = b = l; // Achromatic (gray)
    } else {
      const hueToRgb = (p, q, t) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };
      
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hueToRgb(p, q, h + 1 / 3);
      g = hueToRgb(p, q, h);
      b = hueToRgb(p, q, h - 1 / 3);
    }
    
    const toHex = (x) => {
      const hex = Math.round(x * 255).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };
    
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  };
  
  return hslToRgb(hue, saturation, lightness);
  }

  const handleJoinClick = async (community_id) => {
    try {
      const token = Cookies.get('jwtToken');
      let response = await join_community(token, community_id);
      if (response.status === 200) {
        try {
          // Make a GET request to your API endpoint
          const response = await get_communities(token);
          const responseData = await response.data;
          console.log(responseData);
          setCommunities(responseData.reverse());
          const second_response = await get_user_communities(token);
          console.log("DDDD");
          console.log(second_response);
          const secondResponseData = await second_response.data;
          setYourCommunities(secondResponseData.ownCommunities.reverse());
          setLikedCommunities(secondResponseData.otherCommunities.reverse());
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    } catch (error) {
      alert('Error al seguir la comunidad');
      console.error(error);
    }
  };

  const handleLeaveClick = async (community_id) => {
    try {
      const token = Cookies.get('jwtToken');
      let response = await leave_community(token, community_id);
      if (response.status === 204) {
        try {
          // Make a GET request to your API endpoint
          const response = await get_communities(token);
          const responseData = await response.data;
          console.log(responseData);
          setCommunities(responseData.reverse());
          const second_response = await get_user_communities(token);
          console.log("DDDD");
          console.log(second_response);
          const secondResponseData = await second_response.data;
          setYourCommunities(secondResponseData.ownCommunities.reverse());
          setLikedCommunities(secondResponseData.otherCommunities.reverse());
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    } catch (error) {
      alert('Error al salir de la comunidad');
      console.error(error);
    }
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
    fetchCommunities();
    fetchYourCommunities();
  }, []);

  return (
    <div className='center-content'>
      {!isLoggedIn &&(
        <>
          <h1 className='title'>Comunidades</h1>
          <h3 className='sub_title'>Se parte de multiples comunidades para conectar con mujeres como tú</h3>
          <Link to="/registro">
            <button className='join_button'>Únete</button>
          </Link>
        </>
      )}
      {isLoggedIn && (
        <>
          <h1 className='communities_title'>Tus comunidades            
            {collapsedYourCommunities && (
              <span className='colapse_icon' onClick={showYourComunities}><RiSubtractLine/></span>
            )}
            {!collapsedYourCommunities && (
              <span className='show_icon' onClick={showYourComunities}><IoMdAdd/></span>
            )}
          </h1>
          {collapsedYourCommunities && (
            <div>
              <div
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{ display: 'inline-block' }}
                onClick={handleCreateClick}
              >
                <IoMdCreate className='create_pen' size={34} />
              </div>

              {isFormVisible && (
                <>
                  <form className='create_community_form' onSubmit={handleSubmit(createSubmit)}>
                    <h5 className='create_title'>Crea una comunidad</h5>
                    {/* Add your form fields here */}
                    <h3 className="create_form_subtitle">Nombre</h3>
                    <input className='nombre' {...register('titulo')} placeholder='Nombre' />
                    <h3 className="create_form_subtitle">Descripción</h3>
                    <textarea
                      className='descripcion'
                      {...register('descripcion')}
                      placeholder='Descripción'
                      style={{ height: '9vh', width: '25vw' }}
                    />
                    <row className='buttons_row'>
                      <button type='submit' className='create_community_button'>
                        <MdDone size={18}/>
                      </button>
                      <button type='button' className='cancel_button' onClick={handleCloseCreateForm}>
                        <MdCancel size={18}/>
                      </button>
                    </row>
                  </form>
                </>
              )}
            <div clasName='scrollable_div'>
              <div className='community-container'>
                {yourCommunities.map((yourCommunity) => (
                  <div className='community_div' style={{ borderColor: getRandomColor(), borderWidth: '3px' }}>
                    <div clasName="options_your_community">
                      <div className="row">
                        <div className="col">
                          <PiGearDuotone className='options_buttons' size={20} onClick={() => handleShowEditForm(yourCommunity.id)}/>
                        </div>
                        <div className="col">
                          <MdDeleteOutline className='options_buttons' size={20}  onClick={() => handleDeleteClick(yourCommunity.id)}/>
                        </div>
                      </div>
                    </div>
                    {isEditFormVisible[yourCommunity.id] && (
                      <form
                        className='edit_community_form'
                        onSubmit={(e) => handleSubmit((data) => editSubmit(data, yourCommunity.id))(e)}
                      >
                        {/* Add your form fields here */}
                        <h3 className="edit_form_subtitle">Nombre</h3>
                        <input
                          className='nombre_edit'
                          {...register(`titulo-${yourCommunity.id}`)}
                          placeholder='Nombre'
                          defaultValue={yourCommunity.name}
                        />
                        <h3 className="edit_form_subtitle">Descripción</h3>
                        <textarea
                          className='descripcion_edit'
                          {...register(`descripcion-${yourCommunity.id}`)}
                          placeholder='Descripción'
                          style={{ height: '9vh', width: '15vw' }}
                          defaultValue={currentYourCommunity.description}
                        />
                        <div className='buttons_row_edit'>
                          <button type='submit' className='edit_community_button'>
                            <MdDone size={18}/>
                          </button>
                        </div>
                      </form>
                    )}
                    {!isEditFormVisible[yourCommunity.id] &&(
                      <>
                        <h1 className='community_title'><MdGroups2 size={24}  style={{color: '#fc047c'}}/></h1>
                        <h1 className='community_title'>{yourCommunity.name}</h1>
                        <h3 className='community_description'>{yourCommunity.description}</h3>
                        <h3 className='community_followers'>Seguidores: {yourCommunity.followers}</h3>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>  
          </div>
          )}
          <h1 className='communities_title'>Comunidades que te gustan
            {collapsedLikedCommunities && (
              <span className='colapse_icon' onClick={showLikedComunities}><RiSubtractLine/></span>
              )}
            {!collapsedLikedCommunities && (
              <span className='show_icon' onClick={showLikedComunities}><IoMdAdd/></span>
              )}
          </h1>
          {collapsedLikedCommunities && (
          <div clasName='scrollable_div'>
            <div className='community-container'>
              {likedCommunities.map((community) => (
                <div className='community_div' style={{ borderColor: getRandomColor(), borderWidth: '3px' }}>
                  <HiOutlineHeart className='liked_button' size={25} onClick={() => handleLeaveClick(community.id)}/>
                  <h1 className='community_title'><MdGroups2 size={24}  style={{color: '#fc047c'}}/></h1>
                  <h1 className='community_title' >{community.name}</h1>
                  <h3 className='community_description'>{community.description}</h3>
                  <h3 className='community_followers'>Seguidores: {community.followers}</h3>
                </div>
              ))}
            </div>
          </div>  
          )}

          <h1 className='communities_title'>Todas las comunidades 
            {collapsedCommunities && (
              <span className='colapse_icon' onClick={showAllComunities}><RiSubtractLine/></span>
            )}
            {!collapsedCommunities && (
              <span className='show_icon' onClick={showAllComunities}><IoMdAdd/></span>
            )}
          </h1>
          {collapsedCommunities && (
          <div clasName='scrollable_div'>
            <div className='community-container'>
              {communities.map((community) => (
                <div className='community_div' style={{ borderColor: getRandomColor(), borderWidth: '3px' }}>
                  <HiOutlineHeart className='like_button' size={25} onClick={() => handleJoinClick(community.id)}/>
                  <h1 className='community_title'><MdGroups2 size={24}  style={{color: '#fc047c'}}/></h1>
                  <h1 className='community_title' >{community.name}</h1>
                  <h3 className='community_description'>{community.description}</h3>
                  <h3 className='community_followers'>Seguidores: {community.followers}</h3>
                </div>
              ))}
            </div>
          </div>  
          )}

        </>
      )}
    </div>
  );
}

export default ComunidadesAntiguo;
