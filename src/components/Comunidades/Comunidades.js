import React, { useEffect, useState } from 'react';

import './styles.css';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import {IoMdCreate} from 'react-icons/io';
import { get_communities, create_community, get_community, get_user_communities,
   delete_community, edit_community, join_community, leave_community, get_users} from '../../api';
import { useForm } from "react-hook-form";

import SearchBar from '../Searchbar/Searchbar'; // Adjust the relative path to the SearchBar component

//Mui
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { createTheme } from '@mui/material/styles';
import { styled } from '@mui/system';
import TextField from '@mui/material/TextField';



//Icons
import {BsThreeDots} from 'react-icons/bs';
import {BiSolidChevronUpCircle, BiSolidChevronDownCircle} from 'react-icons/bi';
import {AiFillHeart, AiOutlineHeart} from 'react-icons/ai';
import {RiSendPlaneLine} from 'react-icons/ri';



function Comunidades() {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isEditFormVisible, setIsEditFormVisible] = useState({});


  const [isFeedClicked, setIsFeedClicked] = useState(true);
  const [isFindClicked, setIsFindClicked] = useState(false);
  const [isGroupsClicked, setIsGroupsClicked] = useState(false);



  const [communities, setCommunities] = useState([]);
  const [likedCommunities, setLikedCommunities] = useState([]);
  const [yourCommunities, setYourCommunities] = useState([]);
  const [users, setUsers] = useState([]);

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

  const handleCommunityClick = (communityId) => {
    navigate(`/comunidad/${communityId}`);
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

  const fetchUsers = async () => {
    try {
      const jwtToken = Cookies.get('jwtToken');
      const response = await get_users(jwtToken);
      const responseData = await response.json();
      console.log(responseData);
      setUsers(responseData);

    } catch (error) {
      console.error('Error:', error);
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

  const theme = createTheme({
    palette: {
      ochre: {
        main: '#E3D026',
        light: '#EE4296',
        dark: '#A29415',
        contrastText: '#242105',
      },
    },
  });

  const NavButton = styled(Button)({
    backgroundColor: 'transparent',
    color: '#5A5A5A',
    width: '110%',
    borderRadius: '0px',
    border: '0px',
    height: '7vh',
    '&:hover': {
      backgroundColor: 'rgba(252, 4, 124, 0.1)',
      color: '#fc047c',
      borderLeft: '4px solid #fc047c',
    },
  });

  const ClickedNavButton = styled(Button)({
    backgroundColor: 'rgba(252, 4, 124, 0.1)',
    width: '110%',
    borderRadius: '0px',
    border: '0px',
    height: '7vh',
    borderLeft: '4px solid #fc047c',
    color: '#fc047c',
  });

  const CreateCommunityButton = styled(Button)({
    backgroundColor: '#fc047c',
    color: 'white',
    width: '90%',
    borderRadius: '7px',
    border: '1px',
    height: '3vh',
    marginLeft: '2px',
    '&:hover': {
      backgroundColor: 'rgba(252, 4, 124, 0.8)',
    },
  });

  const CommunitiesSearchBar = styled(SearchBar)({
    width: '100vw',
  });

  const CustomThreeDots = styled(BsThreeDots)({
    color: '#5A5A5A',
    marginTop: '3vh',
    marginLeft: '6vw',
    cursor: 'pointer',
  });

  const FilledCustomThreeDots = styled(BsThreeDots)({
    color: 'white',
    marginTop: '1.9vh',
    backgroundColor: '#5A5A5A',
    borderRadius: '5px',
    paddingRight: '0.5vw',
    paddingLeft: '0.5vw',
    cursor: 'pointer',
  });


  const CommentTextfield = styled(TextField)({
    width: '50vw',
  });

  const handleShowFeedClick = () => {
    setIsFeedClicked(true);
    setIsFindClicked(false);
    setIsGroupsClicked(false);
  };

  const handleShowFindClick = () => {
    setIsFeedClicked(false);
    setIsFindClicked(true);
    setIsGroupsClicked(false);
    fetchUsers();
  };


  const handleShowGroupsClick = () => {
    setIsFeedClicked(false);
    setIsFindClicked(false);
    setIsGroupsClicked(true);
  };

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
            <div className='row'>
                <div className='col nav_col'>
                    <div className='row header_nav'>
                        <div className='col'>
                            <img src='/images/mujer.png' className='profile_img'/>
                        </div>
                        <div className='col'>
                            <h2 className='communities_nav_title'>Comunidades</h2>
                        </div>
                        <div className='col'>
                            <CustomThreeDots size={18}/>
                        </div>
                    </div>
                    <div className='row'>
                        <input className='search_bar_communities' placeholder='Buscar grupos'/>
                    </div>
                    <div className='row nav_button_row'>
                      {isFeedClicked &&(
                        <ClickedNavButton variant="text" onClick={handleShowFeedClick}>
                          <div className='col nav_icon_col'>
                              <img src='/images/board.svg' className='communities_nav_icon'/>
                          </div>
                          <div className='col nav_option_col'>
                              <h3 className='nav_option_text'>Tu feed</h3>
                          </div>
                        </ClickedNavButton>
                      )}
                      {!isFeedClicked &&(
                        <NavButton variant="text" onClick={handleShowFeedClick}>
                            <div className='col nav_icon_col'>
                                <img src='/images/board.svg' className='communities_nav_icon'/>
                            </div>
                            <div className='col nav_option_col'>
                                <h3 className='nav_option_text'>Tu feed</h3>
                            </div>
                        </NavButton>
                      )}
                    </div>
                    <div className='row nav_button_row'>
                      {isFindClicked &&(
                        <ClickedNavButton variant="text" onClick={handleShowFindClick}>
                          <div className='col nav_icon_col'>
                              <img src='/images/target.svg' className='communities_nav_icon'/>
                          </div>
                          <div className='col nav_option_col'>
                              <h3 className='nav_option_text'>Descubrir</h3>
                          </div>
                        </ClickedNavButton>
                      )}
                      {!isFindClicked &&(
                        <NavButton variant="text" onClick={handleShowFindClick}>
                          <div className='col nav_icon_col'>
                              <img src='/images/target.svg' className='communities_nav_icon'/>
                          </div>
                          <div className='col nav_option_col'>
                              <h3 className='nav_option_text'>Descubrir</h3>
                          </div>
                        </NavButton>
                      )}
                    </div>
                    <div className='row nav_button_row'>
                        {isGroupsClicked &&(
                          <ClickedNavButton variant="text" onClick={handleShowGroupsClick}>
                            <div className='col nav_icon_col'>
                                <img src='/images/nav_communities_icon.svg' className='communities_nav_icon'/>
                            </div>
                            <div className='col nav_option_col'>
                                <h3 className='nav_option_text'>Tus grupos</h3>
                            </div>
                          </ClickedNavButton>  
                        )}
                        {!isGroupsClicked &&(
                          <NavButton variant="text" onClick={handleShowGroupsClick}>
                              <div className='col nav_icon_col'>
                                  <img src='/images/nav_communities_icon.svg' className='communities_nav_icon'/>
                              </div>
                              <div className='col nav_option_col'>
                                  <h3 className='nav_option_text'>Tus grupos</h3>
                              </div>
                          </NavButton>
                        )}
                    </div>
                    <div className='row nav_button_row'>
                        <CreateCommunityButton variant="contained">
                            Crea una comunidad
                        </CreateCommunityButton>
                    </div>
                    <div className='groups_div'>
                        <h4 className='sub_title_communities'>Grupos de los que eres parte</h4>
                        {likedCommunities.map((community) => (
                            <div className='community_div row'>
                                <div className='col'>
                                  <img src='/images/nav_communities_icon.svg' className='communities_list_icon'/>
                                </div>
                                <div className='col'>
                                  <h1 className='community_title' >{community.name}</h1>
                                  <h3 className='community_followers'>{community.followers} seguidores</h3>
                                  <h3 className='member_badge'>Miembro</h3>
                                </div>
                                <div className='col'>
                                  <BiSolidChevronDownCircle className='about_button_community_nav' size={24}/>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='col content_col'>
                {isFeedClicked &&(
                  <>
                    <div>
                      <h1 className='sub_title_communities'>Actividad reciente</h1>
                    </div>
                    <div className='publications_div'>
                        <div className='publication_div'>
                          <div className='row publication_data_div'>
                            <div className='col publication_data_image'>
                              <img src='/images/empty_ellipse.svg' className='publication_profile_img'/>
                            </div>
                            <div className='col publication_data_col'>
                                <h2 className='publication_author'>Gracia Cruz</h2>
                                <h4 className='publication_date'>13 de Septiembre del 2023</h4>
                            </div>
                          </div>
                          <div className='row publication_text_div'>
                            <h3 className='publication_text'>
                              Texto falso sobre una publicación de uno de los miembros de la comunidad,
                                puede ser una noticia, opinión, reseña, experiencia, etc. Texto falso sobre una publicación 
                              de uno de los miembros de la comunidad, puede ser una noticia,
                            </h3>
                          </div>
                          <div className='row'>
                            <div className='col publication_options_col'>
                              <h4 className='publication_options_text'><AiFillHeart className='publication_options_icon'/> Me gusta</h4>
                            </div>
                            <div className='col'>
                              <h4 className='publication_options_text'><img src="/images/Vector_send.svg" className='publication_options_icon'/> Reenviar</h4>
                            </div>
                          </div>
                          <div className='row publication_comment'>
                            <div className='col'>
                              <img src='/images/mujer.png' className='comment_profile_img'/>
                            </div>
                            <div className='col'>
                              <form className='box comment_form'>
                                <input className='publication_comment_input' placeholder='Escribe algo...'/>
                              </form>
                            </div>
                          </div>
                        </div>
                        <div className='publication_div'>
                          <div className='row publication_data_div'>
                            <div className='col other_publications_data_image'>
                              <img src='/images/empty_ellipse.svg' className='publication_profile_img'/>
                            </div>
                            <div className='col publication_data_col'>
                                <h2 className='publication_author'>Gracia Cruz</h2>
                                <h4 className='publication_date'>13 de Septiembre del 2023</h4>
                            </div>
                          </div>
                          <div className='publication_text_div'>
                            <div className='row'>
                              <h3 className='publication_text'>
                                Texto falso sobre una publicación de uno de los miembros de la comunidad,
                                  puede ser una noticia, opinión, reseña, experiencia, etc. Texto falso sobre una publicación 
                                de uno de los miembros de la comunidad, puede ser una noticia,
                              </h3>
                            </div>
                            <div className='row'>
                              <img className='publication_content_image' src='/images/empty_image.png'/>
                            </div>
                          </div>
                          <div className='row'>
                            <div className='col publication_options_col'>
                              <h4 className='publication_options_text'><AiFillHeart className='publication_options_icon'/> Me gusta</h4>
                            </div>
                            <div className='col'>
                              <h4 className='publication_options_text'><img src="/images/Vector_send.svg" className='publication_options_icon'/> Reenviar</h4>
                            </div>
                          </div>
                          <div className='row publication_comment'>
                            <div className='col'>
                              <img src='/images/mujer.png' className='comment_profile_img'/>
                            </div>
                            <div className='col'>
                              <form className='box comment_form'>
                                <input className='publication_comment_input' placeholder='Escribe algo...'/>
                              </form>
                            </div>
                          </div>
                        </div>
                    </div>
                  </>
                )}
                {isFindClicked &&(
                  <>  
                  <div className='users_div'>
                    <div className='row'>
                      <h1 className='users_title'>Sugerencias de amigos</h1>
                    </div>
                    <div className='row'>
                      <div className='users-container'>
                        {users.map((user) => (
                          <div className='user_div'>
                            <img src='/images/nav_communities_icon.svg' className='user_icon'/>
                            <h1 className='user_name'>{user.nombre} {user.apellido}</h1>
                            <h3 className='user_followers'>15 contáctos en común</h3>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  </>
                )}
                {isGroupsClicked &&(
                  <>
                    <div className='other_communities_div'>
                      <div className='row'>
                        <div className='col'>
                          <h1 className='other_communities_title'>Tus grupos ({likedCommunities.length})</h1>
                        </div>
                        <div className='col'>
                          <h3 className='sort_communities_button'>Ordenar</h3>
                        </div>
                      </div>
                      <div className='row'>
                        <div className='other-communities-container'>
                          {likedCommunities.map((community) => (
                            <div className='other_community_div'>
                              <img src='/images/nav_communities_icon.svg' className='user_icon'/>
                              <h1 className='other_community_title'>{community.name}</h1>
                              <h3 className='community_last_seen'>Última visita: 15 semanas</h3>
                              <div className='row'>
                                <div className='col'>
                                  <h3 className='see_community_badge' onClick={() => handleCommunityClick(community.id)}>Ver grupo</h3>
                                </div>
                                <div className='col'>
                                  <FilledCustomThreeDots/>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </>
                )}
                </div>
            </div>
        </>
      )}
    </div>
  );
}

export default Comunidades;
