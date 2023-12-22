// Footer.js
import React, { useEffect, useState } from 'react';
import '../Notificaciones/styles.css';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import {IoMdCreate} from 'react-icons/io';
import { get_communities, create_community, get_community, get_user_communities} from '../../api';
import { useForm } from "react-hook-form";
import {AiOutlineDown, AiOutlineUp} from 'react-icons/ai';
import {IoMdAdd} from 'react-icons/io';
import {RiSubtractLine} from 'react-icons/ri';
import {MdGroups2, MdDeleteOutline} from 'react-icons/md';
import {PiGearDuotone} from 'react-icons/pi';

function Comunidades() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const {register, handleSubmit } = useForm();

  const [communities, setCommunities] = useState([]);
  const [yourCommunities, setYourCommunities] = useState([]);

  const [currentCommunity, setCurrentCommunity] = useState();
  const [currentYourCommunity, setCurrentYourCommunity] = useState();


  const [communityVisibility, setCommunityVisibility] = useState({});
  const [collapsedYourCommunities, setCollapsedYourCommunities] = useState(false);
  const [collapsedCommunities, setCollapsedCommunities] = useState(true);
  const [yourCommunityVisibility, setYourCommunityVisibility] = useState({});


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

  const fetchYourCommunities = async () => {
    try {
      // Make a GET request to your API endpoint
      const token = Cookies.get('jwtToken');
      const response = await get_user_communities(token);
      const responseData = await response.data;
      setYourCommunities(responseData.ownCommunities.reverse());
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
      if (response.status === 200) {
        window.alert("Comunidad creada exitosamente");
        try {
          // Make a GET request to your API endpoint
          const token = Cookies.get('jwtToken');
          const response = await get_communities(token);
          const responseData = await response.data;
          setCommunities(responseData);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    } catch (error) {
      alert('Error al crear comunidad');
      console.error(error);
    }
  };

  const showYourComunities = () => {
    if (collapsedYourCommunities){
      setCollapsedYourCommunities(false);
    } else {
      setCollapsedYourCommunities(true);
    }
  };

  const showAllComunities = () => {
    if (collapsedCommunities){
      setCollapsedCommunities(false);
    } else {
      setCollapsedCommunities(true);
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
                <IoMdCreate size={34} style={{ marginLeft: '60vw', color: '#fc047c' }} />
                {isHovered && (
                  <h6
                    style={{
                      marginLeft: '59vw',
                      position: 'absolute',
                      fontSize: '1.3em',
                      marginTop: '-1vh',
                      width: 'auto',
                      height: 'auto',
                    }}
                  >
                    Crear
                  </h6>
                )}
              </div>

              {isFormVisible && (
                <>
                  <h5 className='create_title'>Crea una comunidad</h5>
                  <form className='box' onSubmit={handleSubmit(createSubmit)}>
                    {/* Add your form fields here */}
                    <input className='nombre' {...register('titulo')} placeholder='Nombre' />
                    <input
                      className='descripcion'
                      {...register('descripcion')}
                      placeholder='Descripción'
                    />
                    <button type='submit' className='create_community_button'>
                      Crear
                    </button>
                    <button type='button' className='cancel_button' onClick={handleCloseCreateForm}>
                      Cancelar
                    </button>
                  </form>
                </>
              )}
            <div clasName='scrollable_div'>
              <div className='community-container'>
                {yourCommunities.map((yourCommunity) => (
                  <div className='community_div'>
                    <div clasName="options_your_community">
                      <div className="row">
                        <div className="col">
                          <PiGearDuotone className='options_buttons' size={20}/>
                        </div>
                        <div className="col">
                          <MdDeleteOutline className='options_buttons' size={20}/>
                        </div>
                      </div>
                    </div>
                    <h1 className='community_title'><MdGroups2 size={24}  style={{color: '#fc047c'}}/></h1>
                    <h1 className='community_title'>{yourCommunity.name}</h1>
                    {!yourCommunityVisibility[yourCommunity.id] && (
                      <AiOutlineDown className="more_info_button" size={18} onClick={() => handleShowYourCommunityClick(yourCommunity.id)}/>
                    )}
                    {yourCommunityVisibility[yourCommunity.id] && (
                      <>
                        <AiOutlineUp className="more_info_button" size={18} onClick={() => handleShowYourCommunityClick(yourCommunity.id)}/>
                        <h3 className='community_description'>{currentYourCommunity.description}</h3>
                      </>
                    )}
                  </div>
                ))}
              </div>
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
                <div className='community_div'>
                  <h1 className='community_title'><MdGroups2 size={24}  style={{color: '#fc047c'}}/></h1>
                  <h1 className='community_title'>{community.name}</h1>
                  {!communityVisibility[community.id] && (
                    <AiOutlineDown className="more_info_button" size={18} onClick={() => handleShowCommunityClick(community.id)}/>
                  )}
                  {communityVisibility[community.id] && (
                    <>
                      <AiOutlineUp className="more_info_button" size={18} onClick={() => handleShowCommunityClick(community.id)}/>
                      <h3 className='community_description'>{currentCommunity.description}</h3>
                    </>
                  )}
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

export default Comunidades;
