import './Perfil.css'; // Importa el archivo de estilos CSS
import { get_profile, delete_user, patch_user, change_password } from '../../api';
import { get_paises, get_industrias, get_profesiones, get_universidades, get_cargos, get_anos_experiencia, get_disponibilidades, get_jornadas, get_modalidades, get_idiomas, get_regiones, get_conocio_wot, get_formularios, get_areas, get_competencias, } from '../../api';
import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Modal from 'react-modal';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import ajustes1 from "./imagenes/ajustes 1.png";
import mujer2 from "./imagenes/mujer 2.png";
import imagen1 from "./imagenes/imagen 1.png";
import captura2 from "./imagenes/Captura2.png";




function Perfil() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [modalContraIsOpen, setModalContraIsOpen] = useState(false);
  const [nuevosDatos, setNuevosDatos] = useState({});
  const [datosPaises, setDatosPaises] = useState([]);
  const [datosIndustrias, setDatosIndustrias] = useState([]);
  const [datosProfesiones, setDatosProfesiones] = useState([]);
  const [datosAnios, setDatosAnios] = useState([]);
  const [datosUniversidades, setDatosUniversidades] = useState([]);
  const [datosCargos, setDatosCargos] = useState([]);
  const [datosDisponibilidad, setDatosDisponibilidad] = useState([]);
  const [datosJornada, setDatosJornada] = useState([]);
  const [datosModalidades, setDatosModalidades] = useState([]);
  const [datosIdiomas, setDatosIdiomas] = useState([]);
  const [datosCompromiso, setDatosCompromiso] = useState([]);
  const [datosWot, setDatosWot] = useState([]);
  const [datosPersonalidad, setDatosPersonalidad] = useState([]);
  const [datosAreas, setDatosAreas] = useState([]);
  const [datosCompetencia, setDatosCompetencias] = useState([]);
  const [mostrarCuadroTextoUniversidad, setMostrarCuadroTextoUniversidad] = useState(false);
  const [mostrarCuadroTextoPostgrado, setMostrarCuadroTextoPostgrado] = useState(false);
  const [mostrarCuadroTextoInclusion, setMostrarCuadroTextoInclusion] = useState(false);
  const [mostrarCuadroTextoRegion, setMostrarCuadroTextoRegion] = useState(false);
  const [mostrarPueblo, setMostrarPueblo] = useState(false);
  const [mostrarCargoAdicional, setMostrarCargoAdicional] = useState(false);
  const [mostrarFactor, setMostrarFactor] = useState(false);
  const [mostrarContacto1, setMostrarContacto1] = useState(false);
  const [mostrarContacto2, setMostrarContacto2] = useState(false);
  const [mostrarCompromiso, setMostrarCompromiso] = useState(false);
  Modal.setAppElement('#root');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [datos, setDatos] = useState([]);
  const [profesion1,setProfesion1] = useState('');
  const [profesion2,setProfesion2] = useState('');
  const [opcionesArea, setOpcionesArea] = useState([]);
  const [opcionesIndustria, setOpcionesIndustria] = useState([]);
  const [opcionesCompetencia, setOpcionesCompetencia] = useState([]);
  const [contacto1, setContacto1] = useState([]);
  const [contacto2, setContacto2] = useState([]);

  const [activeInfo, setActiveInfo] = useState(1);

  const handleInfoChange = (infoNumber) => {
    setActiveInfo(infoNumber);
  };


  const navigate = useNavigate();
  
  const claveMapeo = {
    nombre: 'name',
    apellido: 'lastName',
  };
  const handleInputChange = (event) => {
    try{
    const { name, value } = event.target;
    const nuevaClave = claveMapeo[name] || name;
    setDatos({ ...datos, [name]: value })
    setNuevosDatos({ ...nuevosDatos, [nuevaClave]: value });
    console.log(nuevosDatos);
    }
    
    catch (error) {
      console.error('Error:', error);
    }
  };
  const handleNext = () => {
    if (currentStep<9){
    setCurrentStep(currentStep + 1);
  } else{window.alert("Se acabo el formulario");
  }}
  const handlePrev = () => {
    if (currentStep-1 > 0){
      setCurrentStep(currentStep -1);
    } else {
      window.alert("No se puede ir mas atras");
    }};
    
  const handleDropdownChange = (event) => {
    const { name, value } = event.target;
    if (name === "university"){
      setMostrarCuadroTextoUniversidad(value === "Otra")
    } else if (name === "postgrado"){
      setMostrarCuadroTextoPostgrado(value === "Si")
    } else if (name === "inclusionFactor"){
      setMostrarCuadroTextoInclusion(value === "Si")
    } else if (name === "regionCompromise"){
      setMostrarCuadroTextoRegion(value === "Si")
    }
    setDatos({ ...datos, [name]: value });
    setNuevosDatos({ ...nuevosDatos, [name]: value });
    console.log(nuevosDatos)
  };

  const handleAdicional = (event) =>{
    const { name, value } = event.target;
    if (name==="rolAdicional" && value==="1"){
      setMostrarCargoAdicional(true);
    }
    else if(name==="rolAdicional" && value===""){
      setMostrarCargoAdicional(false);
    }
    else if (name==="factor" && value==="1"){
      setMostrarFactor(true);
    }
    else if(name==="factor" && value===""){
      setMostrarFactor(false);
    }
    else if (name==="compromiso" && value==="1"){
        setMostrarCompromiso(true);
      }
      else if(name==="compromiso" && value===""){
        setMostrarCompromiso(false);
    }
    else if (name==="pueblo" && value==="1"){
      setMostrarPueblo(true);
    }
    else if(name==="pueblo" && value===""){
      setMostrarPueblo(false);}
    else if (name==="contacto1" && value===''){
      setMostrarContacto1(false);
    }
    else if (name==="contacto1" && value==='1'){
      setMostrarContacto1(true);
      setContacto1(['','','']);
    }
    else if (name==="contacto2" && value===''){
      setMostrarContacto2(false);
    }
    else if (name==="contacto2" && value==='1'){
      setMostrarContacto2(true);
      setContacto2(['','','']);
    }
    };

  const handleArray = (event) => {
    const { name, value } = event.target;
    if (name === "idiomas"){
      const valueArray = [value];
      setNuevosDatos({ ...nuevosDatos, [name]: valueArray });
    }
    else if (name === "profesion1"){
      setProfesion1(value);
      console.log(profesion1)
    }
    else if (name === "profesion2"){
      setProfesion2(value);
    }
    else if (name === "disponibilidad"){
      const valueArray = [value];
      setNuevosDatos({ ...nuevosDatos, [name]: valueArray });
    }
   

  };
 const handleSeleccion = (event) => {
    const {name,value} = event.target;
    console.log('Valor que recibo de funcion'+value)
    if(value.length<=5){
    if (name ==="industriasExperiencia"){
      setOpcionesIndustria(value);
      setNuevosDatos({ ...nuevosDatos, ["industriasExperiencia"]: value});
      console.log(nuevosDatos);}
      else if (name ==="competencias"){
        setOpcionesCompetencia(value);
        console.log(opcionesCompetencia);
        setNuevosDatos({ ...nuevosDatos, ["competencias"]: value });
        console.log(nuevosDatos)
        }
        else if (name ==="areas"){
          setOpcionesArea(value);
          console.log(opcionesArea);
          setNuevosDatos({ ...nuevosDatos, ["areasExperiencia"]: value });
          console.log(nuevosDatos);
          }
    }else{
      window.alert("Número maximo de selecciones alcanzado")
    }};
  const handleContactos = (event) =>{
    const {name,value} = event.target;
    if (name === "contacto_nombre1"){
      let copiaContacto = [...contacto1];
      copiaContacto[0] = value;
      setContacto1(copiaContacto);
      console.log(copiaContacto);
      console.log(contacto1);

    }
    else if(name==="contacto_celular1"){
      let copiaContacto = [...contacto1];
      copiaContacto[2] = value;
      setContacto1(copiaContacto);
    }
    else if(name==="contacto_mail1"){
      let copiaContacto = [...contacto1];
      copiaContacto[1] = value;
      setContacto1(copiaContacto);
    }
    else if(name==="contacto_nombre2"){
      let copiaContacto = [...contacto1];
      copiaContacto[0] = value;
      setContacto2(copiaContacto);
    }
    else if(name==="contacto_celular2"){
      let copiaContacto = [...contacto1];
      copiaContacto[2] = value;
      setContacto2(copiaContacto);
    }
    else if(name==="contacto_mail2"){
      let copiaContacto = [...contacto1];
      copiaContacto[1] = value;
      setContacto2(copiaContacto);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Transformar campos vacíos en null antes de enviarlos a la API
    const datosActualizados = { ...nuevosDatos };
    for (const key in datosActualizados) {
      if (datosActualizados[key] === '') {
        datosActualizados[key] = null;
      }
    }
    const profesiones = [];
    if (profesion1 !== ''){
      profesiones.push(profesion1);
    }
    if (profesion2 !== ''){
      profesiones.push(profesion2);
    }
    if (profesiones.length !== 0){
      datosActualizados["profesiones"] = profesiones;
    }
    const contactos = [];
    if (mostrarContacto1){
      if (contacto1[0] !=='' || contacto1[1] !==''  || contacto1[2] !=='' ){
        contactos.push(contacto1);
      }}
    if (mostrarContacto2){
      if (contacto2[0] !=='' || contacto2[1] !==''  || contacto2[2] !=='' ){
        contactos.push(contacto2);
      }}
      if (contactos.length !==0){
        datosActualizados["contactos"] = contactos;
      }

    console.log('Enviando datos actualizados:', datosActualizados);
    const token = Cookies.get('jwtToken');
    const response = await get_profile(token);
    const responseData = await response.json();
    if (!("rut" in datosActualizados) && datos.rut === null){
      datosActualizados["rut"] = null;
    }
    else if (!("rut" in datosActualizados) && datos.rut !== null){
      datosActualizados["rut"] = datos.rut;
    }
    //datosActualizados["rut"] = responseData.rut;
    const responsePatch = await patch_user(token,datosActualizados);
    
    
    
    setDatos(responseData);
    setModalIsOpen(false);
    console.log(responsePatch);
    // Cerrar el modal después de enviar los datos
    //mostrarUser();
  };


  useEffect(() => {
    const jwtToken = Cookies.get('jwtToken');
    if (jwtToken) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    mostrarUser();
  }, []);

  const mostrarUser = async () => {
    try{
      const jwtToken = Cookies.get('jwtToken');
      const response = await get_profile(jwtToken);
      const responseData = await response.json();
      setDatos(responseData);
      const responsePaises = await get_paises();
      setDatosPaises(responsePaises.data);
      const responseIndustrias = await get_industrias();
      setDatosIndustrias(responseIndustrias.data);
      const responseProfesiones = await get_profesiones();
      setDatosProfesiones(responseProfesiones.data);
      const responseUniversidades = await get_universidades();
      setDatosUniversidades(responseUniversidades.data);
      const responseCargos = await get_cargos();
      setDatosCargos(responseCargos.data);
      const responseAnios = await get_anos_experiencia();
      setDatosAnios(responseAnios.data);
      const responseDisponibilidad = await get_disponibilidades();
      setDatosDisponibilidad(responseDisponibilidad.data);
      const responseJornada = await get_jornadas();
      setDatosJornada(responseJornada.data);
      const responseModalidades = await get_modalidades();
      setDatosModalidades(responseModalidades.data);
      const responseIdiomas = await get_idiomas();
      setDatosIdiomas(responseIdiomas.data);
      const responseCompromiso = await get_regiones();
      setDatosCompromiso(responseCompromiso.data);
      const responseWot = await get_conocio_wot();
      setDatosWot(responseWot.data);
      const responsePersonalidad = await get_formularios();
      setDatosPersonalidad(responsePersonalidad.data);
      const responseAreas = await get_areas();
      setDatosAreas(responseAreas.data);
      const responseCompetencias = await get_competencias();
      setDatosCompetencias(responseCompetencias.data);
      setNuevosDatos();
      console.log(responseData);
      /*const patch = {
        "idiomas": ["1"]
      };
      await patch_user(jwtToken,patch);*/
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const menuProps = {
    anchorOrigin: {
      vertical: 'bottom',
      horizontal: 'left',
    },
  };
  
  const deleteUser = async () => { // onClick={this.deleteUser} en button
    try {
      const jwtToken = Cookies.get('jwtToken');
      const response = await delete_user(jwtToken);
      if (response.status == 200) {
        Cookies.remove('jwtToken');
        window.alert('Cuenta eliminada');
        navigate('/login');
      }
    } catch (error) {
      alert('Fallo a eliminar cuenta.');
      console.error(error);
    }
  };

  const changePassword = async (event) => {
    //setModalPublicationIsOpen(false);
    
    try {
      const formData = new FormData(event.target); // Accede a los datos del formulario
    
      const oldPassword = formData.get("oldPassword");
      const newPassword = formData.get("newPassword");
      const newPasswordConfirmation = formData.get("newPasswordConfirmation");

      const token = Cookies.get('jwtToken');
      let response = await change_password(oldPassword, newPassword, newPasswordConfirmation, token);
      const responseData = await response.json();
      console.log('Response Data:', responseData);
      console.log(response.status);
      
      setModalContraIsOpen(false);

    } catch (error) {
      alert('Signup failed. Please try again.');
      console.error(error);
    }
    
  };
  const bordeElipse1 = currentStep === 1 ? 'borde-elipse' : '';
  const bordeElipse2 = (currentStep >=2 && currentStep <=4) ? 'borde-elipse' : '';
  const bordeElipse3 = currentStep === 5 ? 'borde-elipse' : '';
  const bordeElipse4 = (currentStep >=6 && currentStep <=7) ? 'borde-elipse' : '';
  const bordeElipse5 = currentStep >7 ? 'borde-elipse' : '';
  const destacado1 = currentStep === 1 ? 'destacado' : '';
  const destacado2= (currentStep >=2 && currentStep <=4) ? 'destacado' : '';
  const destacado3 = currentStep === 5 ? 'destacado' : '';
  const destacado4 = (currentStep >=6 && currentStep <=7) ? 'destacado' : '';
  const destacado5 = currentStep >7 ? 'destacado' : '';

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
            <p className="nombre-apellido">{datos.nombre} {datos.apellido}</p>
            {datos.mail != null && <p className="sobre-ti">Email: {datos.mail}</p>}
            {datos.rut != null && <p className="sobre-ti">Rut: {datos.rut}</p>}
            {datos.celular != null && <p className="sobre-ti">Teléfono: {datos.celular}</p>}
            {datos.paisDomicilio != null && <p className="sobre-ti">País de Residencia: {datos.paisDomicilio.pais}</p>}
            {datos.brief != null && <p className="sobre-ti">{datos.brief}</p>}

            <p className="element-contactos">50 contactos</p>
            <div className="flex-container">
              <button onClick={() => setModalIsOpen(true)} className="button_rosa">Completar formulario</button>
              <button className="button_buscando_empleo">Buscando Empleo</button>
              <button className="button_ajustes">
              <img className="ajustes" alt="Ajustes" src={ajustes1}/>
              Ajustes
              </button>
            </div>

            <p></p>
            <div className="linea_gris"></div>
          </div>
          
          <div className="rectangle_gris"></div>

          <div className="circulo-blanco" ></div>
          <img className="imagen" alt="Imagen" src={imagen1} />

          <div className="linea_rosa"></div>
          <div className="linea_rosa_corta"></div>
          <img className="mujer" alt="Mujer" src={mujer2} />
          <div className="elipse-fucsia"></div>

          <div className="rectangulo_seccion">
            <p className="nombre-apellido">Formulario</p>
            <p className="sobre-ti">En este formulario te preguntamos lo necesario para crear tu perfil de mujer en WoT</p>
            <p className="element-contactos">Tiempo de llenado: 7 minutos aprox</p>

            <div className="linearecta">
              <div className="rectangle_progreso"></div>
              <div className="barra"></div>
              <p className="porcentaje">15%</p>
            </div>
            
            <p></p>
            <div className="linea_gris"></div>

          </div>

          <div className="rectangulo_seccion">
            <p className="perfil-letra">Perfil</p>
          
            <div className="horizontal-bar">
              
              <button onClick={() => handleInfoChange(1)} className={activeInfo === 1 ? "button-activate" : "button-inactivate"}>
                Estudios
              </button>

              <button onClick={() => handleInfoChange(2)} className={activeInfo === 2 ? "button-activate" : "button-inactivate"}>
                Experiencia
              </button>

              <button onClick={() => handleInfoChange(3)} className={activeInfo === 3 ? "button-activate" : "button-inactivate"}>
                Laboral
              </button>

              <button onClick={() => handleInfoChange(4)} className={activeInfo === 4 ? "button-activate" : "button-inactivate"}>
                Intereses
              </button>

              <button onClick={() => handleInfoChange(5)} className={activeInfo === 5 ? "button-activate" : "button-inactivate"}>
                Otros
              </button>

              <div className="linea_gris_buttons"></div>
            </div>

          </div> 

          {activeInfo === 1 && (datos.universidad != null || datos.postgrado != null) &&
            <div className="info-container">
              <div className='contenedor-mayor'>
                <div className="flex-container"> 
                  <div className="black-square"></div>
                  <div className='container-comunidad'> 
                    {datos.universidad != null && <p className="letra-gris">Universidad: {datos.universidad}</p>}
                    {datos.postgrado != null && <p className="letra-gris">Postgrado realizado: {datos.postgrado}</p>}
                  </div>
                </div>
                <div className='linea-gris-mediana'></div>
              </div>
            </div>}

            {activeInfo === 2 && 
            <div className="info-container">

              {(datos.empresa_actual != null || datos.cargo != null || datos.industria != null) &&
                <div className='contenedor-mayor'>
                <div className="flex-container"> 
                  <div className="black-square"></div>
                  <div className='container-comunidad'> 
                  {datos.empresa_actual != null && <p className="letra-gris">Empresa: {datos.empresa_actual} </p>}
                  {datos.cargo != null  && <p className="letra-gris">Cargo: {datos.cargo.cargo}</p>}
                  {datos.industria != null && <p className="letra-gris">Industria: {datos.industria.nombre_industria}</p>}
                  </div>
                </div>
                <div className='linea-gris-mediana'></div>
              </div>}

              {(datos.empresa_adicional != null || datos.aditionalCargo != null || datos.aditionalIndustria != null) &&
              <div className='contenedor-mayor'>
                <div className="flex-container"> 
                  <div className="black-square"></div>
                  <div className='container-comunidad'> 
                  {datos.empresa_adicional != null  && <p className="letra-gris">Empresa: {datos.empresa_adicional}</p>}
                  {datos.aditionalCargo && <p className="letra-gris"> Cargo: {datos.aditionalCargo.cargo}</p>}
                  {datos.aditionalIndustria != null && <p className="letra-gris">Industria: {datos.aditionalIndustria.nombre_industria}</p>}
                  </div>
                </div>
                <div className='linea-gris-mediana'></div>
              </div>}

              {(datos.aniosExperiencia != null || datos.experienciaDirectorios != null || datos.altaDireccion != null) &&
              <div className='contenedor-mayor'>
                <div className="flex-container"> 
                  <div className="black-square"></div>
                  <div className='container-comunidad'> 
                  {datos.aniosExperiencia != null && <p className="letra-gris">Años de experiencia: {datos.aniosExperiencia.rango_experiencia_desde} - {datos.aniosExperiencia.rango_experiencia_hasta}</p>}
                  {datos.experienciaDirectorios != null && datos.experienciaDirectorios == true && <p className="letra-gris">Experiencia en directorios: si</p>}
                  {datos.altaDireccion != null && datos.altaDireccion == true && <p className="letra-gris">Experiencia en alta dirección: si</p>}
                  </div>
                </div>
                <div className='linea-gris-mediana'></div>
              </div>}

              {(datos.areas != null) &&
              <div className='contenedor-mayor'>
                <div className="flex-container"> 
                  <div className="black-square"></div>
                  <div className='container-comunidad'> 
                  {datos.areas != null && <p className="titulo-letra-gris-pequena">Áreas con experiencia:</p> }
                  <div className="contenedor-fila">
                  {datos.areas != null && datos.areas?.map((area, index)=>(
                    <p key={"areas_experiencia" + index.toString()} className="letra-gris-pequena">{area.nombre}</p>))}
                  </div>
                  </div>
                </div>
                <div className='linea-gris-mediana'></div>
              </div>}

              {(datos.industrias != null) &&
              <div className='contenedor-mayor'>
                <div className="flex-container"> 
                  <div className="black-square"></div>
                  <div className='container-comunidad'> 
                  {datos.industrias != null && <p className="titulo-letra-gris-pequena">Industrias con experiencia:</p> }
                  <div className="contenedor-fila">
                  {datos.industrias != null && datos.industrias?.map((industria, index)=>(
                    <p key={"industrias_experiencia" + index.toString()} className="letra-gris-pequena">{industria.nombre_industria}</p>))}
                  </div>
                  </div>
                </div>
                <div className='linea-gris-mediana'></div>
              </div>}

            </div>}

          {activeInfo === 3 && 
            <div className="info-container">

              {datos.competencia != null && 
              <div className='contenedor-mayor'>
                <div className="flex-container"> 
                  <div className="black-square"></div>
                  <div className='container-comunidad'> 
                    {datos.competencia != null && <p className="titulo-letra-gris-pequena">Competencias:</p> }
                    <div className="contenedor-fila">
                    {datos.competencia != null && datos.competencia?.map((competenci, index)=>(
                      <p key={"competencias" + index.toString()} className="letra-gris-pequena">{competenci.competencia}</p>))}
                    </div>
                  </div>
                </div>
                <div className='linea-gris-mediana'></div>
              </div>}

              { (datos.tipoJornada != null || datos.tipoModalidad != null || datos.disponibilidad != null) &&
              <div className='contenedor-mayor'>
                <div className="flex-container"> 
                  <div className="black-square"></div>
                  <div className='container-comunidad'> 
                    {datos.disponibilidad.length != 0 && <p className="letra-gris">Disponibilidad: {datos.disponibilidad[0].disponibilidad}</p>}
                    {datos.tipoJornada != null && <p className="letra-gris">Disponibilidad de Jornada: {datos.tipoJornada.tipoJornada}</p>}
                    {datos.tipoModalidad != null && <p className="letra-gris">Modalidad preferida: {datos.tipoModalidad.tipoModalidad}</p>}
                  </div>
                </div>
                <div className='linea-gris-mediana'></div>
              </div>}

              { (datos.posibilidadCambiarseRegion != null || datos.regionCompromiso != null /*|| datos.disposicion_viajar != null*/) &&
              <div className='contenedor-mayor'>
                <div className="flex-container"> 
                  <div className="black-square"></div>
                  <div className='container-comunidad'> 
                    {datos.posibilidadCambiarseRegion != null && <p className="letra-gris">Posibilidad de cambiarse de región: {datos.posibilidadCambiarseRegion.posibilidad}</p>}
                    {datos.regionCompromiso != null && <p className="letra-gris">Compromiso con alguna región del pais: {datos.regionCompromiso.nombre}</p>}
                    {datos.disposicion_viajar != null && datos.disposicion_viajar == true &&  <p className="letra-gris">Tiene disposición para viajar: si</p>}
                  </div>
                </div>
                <div className='linea-gris-mediana'></div>
              </div>}

              {datos.factor != null &&
              <div className='contenedor-mayor'>
                <div className="flex-container"> 
                  <div className="black-square"></div>
                  <div className='container-comunidad'> 
                    {datos.factor != null && <p className="letra-gris">Tiene algún factor de inclusión laboral: {datos.factor}</p>}
                  </div>
                </div>
                <div className='linea-gris-mediana'></div>
              </div>}

            </div>}

            {activeInfo === 4 && (datos.personalidad != null || datos.intereses != null) &&
            <div className="info-container">   
              <div className='contenedor-mayor'>
                <div className="flex-container"> 
                  <div className="black-square"></div>
                  <div className='container-comunidad'> 
                  {datos.intereses != null && <p className="letra-gris">Intereses: {datos.intereses}</p>}
                  {datos.personalidad != null && <p className="letra-gris">Respuesta formulario personalidad: {datos.personalidad.personalidad}</p>}
                  </div>
                </div>
                <div className='linea-gris-mediana'></div>
              </div>
            </div>}

            {activeInfo === 5 && (datos.conocioWOT != null || datos.redesSociales != null || datos.nombrePuebloOriginario != null) &&
            <div className="info-container">
                <div className='contenedor-mayor'>
                  <div className="flex-container"> 
                    <div className="black-square"></div>
                    <div className='container-comunidad'> 
                    {datos.redesSociales != null && <p className="letra-gris">Redes Sociales: {datos.redesSociales}</p>}
                    {datos.conocioWOT != null && <p className="letra-gris">Como conocio a Wot: {datos.conocioWOT.conocio}</p>}
                    {datos.nombrePuebloOriginario != null && <p className="letra-gris">Se identifica con algún pueblo originario: {datos.nombrePuebloOriginario}</p>}                    </div>
                    </div>
                  <div className='linea-gris-mediana'></div>
                </div>
            </div>
            }
        </div>

        <div className="rectangulo-arriba">
      
            <p className="match">Match</p>

            <div className="flex-container">
              <img className="mujer-2" src={mujer2} />
              <img
              className="captura2"
              src={captura2}
              />
            </div>
            
            <p className="claudia-explora"> Claudia, explora oportunidades relevantes con WoT</p>
            <button className="button-verperfil">Ver perfil</button>

          </div>
          <div className="segundo-rectangulo">
            <p className="otros-comunidades">Otras comunidades</p>

              <div className='contenedor-mayor'>
                <div className="flex-container"> 
                  <div className="sphere"></div>
                  <div className='container-comunidad'> 
                    <p className="nombre-comunidad">Comunidad</p>
                    <p className="cantidad-seguidores">13.000.432 seguidores</p>
                    <button className="button-siguiendo">Siguiendo</button>
                  </div>
                </div>
                <div className='linea-gris-corta'></div>
              </div>

              <div className='contenedor-mayor'>
                <div className="flex-container"> 
                  <div className="sphere"></div>
                  <div className='container-comunidad'> 
                    <p className="nombre-comunidad">Comunidad</p>
                    <p className="cantidad-seguidores">13.000.432 seguidores</p>
                    <button className="button-siguiendo">Siguiendo</button>
                  </div>
                </div>
                <div className='linea-gris-corta'></div>
              </div>

              <div className='contenedor-mayor'>
                <div className="flex-container"> 
                  <div className="sphere"></div>
                  <div className='container-comunidad'> 
                    <p className="nombre-comunidad">Comunidad</p>
                    <p className="cantidad-seguidores">13.000.432 seguidores</p>
                    <button className="button-siguiendo">Siguiendo</button>
                  </div>
                </div>
                <div className='linea-gris-corta'></div>
              </div>

          </div> 
        </div>
      </div>
      </div>

      /*
      <div>
        <div className="rectangulo-rosado">

        </div>
        <div className="rectangulo-rosado">
          <h2>Dominio de Idioma</h2>
          {datos.idiomas?.map(idioma=>(
            <p >{idioma.nombre}</p>
          ))}
        </div>

        <h3>¿Deseas cambiar tu contraseña?</h3>
        <button onClick={() => setModalContraIsOpen(true)} className="button-pink" >Cambiar contraseña</button>
        <p></p>

        <h3>¿Deseas eliminar tu cuenta?</h3>
        <button className="button-pink" onClick={deleteUser} id='eliminar_cuenta_button'>Eliminar cuenta</button>
        <p></p>

      </div>
      */

    )}
  </div><div>
      
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Editar Datos"
        className='estilo-modal'
      >
        
      <div>
          <p className={`texto-elipse-1 ${destacado1}`}>Información personal</p>
          <p className={`texto-elipse-2 ${destacado2}`}>Información profesional</p>
          <p className={`texto-elipse-3 ${destacado3}`}>Disponibilidad</p>
          <p className={`texto-elipse-4 ${destacado4}`}>Información adicional</p>
          <p className={`texto-elipse-5 ${destacado5}`}>Referencias</p>
          <div className={`elipse ${bordeElipse1}`}>1</div>
          <div className={`elipse2 ${bordeElipse2}`}>2</div>
          <div className={`elipse3 ${bordeElipse3}`}>3</div>
          <div className={`elipse4 ${bordeElipse4}`}>4</div>
          <div className={`elipse5 ${bordeElipse5}`}>5</div>
          
          <form onSubmit={handleSubmit} className='formulario-modal'>
            {currentStep===1 &&(
              <>
              <div className='columnas margin-columnas-top'>
              <div className='columna-izquierda'>
                <div className='form-group'>
                  <label className="label-negrita">Nombre</label>
                  <label className='label-gris'>Ej: Josefina</label>
                  <input
                    type="text"
                    id="name"
                    name="nombre"
                    value={datos.nombre || ''}
                    onChange={handleInputChange}
                    className="form-control" />
                </div><div className='form-group'>
                    <label htmlFor="rut" className="label-negrita">Rut</label>
                    <label className='label-gris'>Ej: 23245245-K</label>
                    <input
                      type="text"
                      id="rut"
                      name="rut"
                      value={datos.rut || ''}
                      onChange={handleInputChange}
                      className="form-control" />
                  </div>
                  <div className='form-group'>
                    <label htmlFor="Intereses" className="label-negrita">Intereses </label>
                    <label className='label-gris'>Señala tus principales intereses personales o profesionales.</label>
                    <label className='label-gris'>Máximo 3 palabras separadas por coma.</label>
                    <input
                      type="text"
                      id="Intereses"
                      name="intereses"
                      value={datos.intereses || ''}
                      onChange={(event) => handleInputChange(event)}
                      className="form-control" />
                  </div>
                  </div>
                  <div className='columna'>
                  <div className='form-group'>
                    <label htmlFor="apellido" className="label-negrita">Apellido:</label>
                    <label className='label-gris'>Ej: Lagos</label>
                    <input
                      type="text"
                      id="apellido"
                      name="apellido"
                      value={datos.apellido || ''}
                      onChange={handleInputChange}
                      className="form-control" />
                  </div>
                  <div className='form-group'>
                    <label htmlFor="celular" className="label-negrita">Celular:</label>
                    <label className='label-gris'>Ej: +569 23423456</label>
                    <input
                      type="tel"
                      id="celular"
                      name="celular"
                      value={datos.celular || ''}
                      onChange={handleInputChange}
                      className="form-control" />
                  </div><div className='form-group'>
                    <label className='label-negrita'>País de domicilio</label>
                    <select
                      //value={datos.paisDomicilio?.id || ''}
                      className='form-control'
                      name='id_pais_domicilio'
                      onChange={(event) => handleDropdownChange(event)}>
                      <option value=''>Escoga una opción</option>
                      {datosPaises.map(country => (
                        <option key={country.id} value={country.id}>
                          {country.pais}
                        </option>
                      ))}
                    </select>
                  </div>
                  </div>
                  </div>
                  </>
            )}
            {currentStep===2 &&(
              <><div className='contenedor-fila'>
              <label className={`label-fila texto-subrayado`}>Estudios</label>
              <label className='label-fila'>Laboral</label>
              <label className='label-fila'>Experiencia</label>
              </div><div className='columnas'><div className='columna-izquierda'>
              <div className='form-group'>
                <label className='label-negrita'>Profesión</label>
                <label className='label-gris'>Elige la opción que más se acomode a tu profesión</label>
                <select
                  className='form-control'
                  name='profesion1'
                  onChange={(event) => handleArray(event)}>
                  <option value="">Escoge una opcion</option>
                  {datosProfesiones.map(profesion => (
                    <option key={profesion.id} value={profesion.id}>
                      {profesion.nombre}
                    </option>
                  ))}
                </select>
              </div>
              <div className='form-group'>
                  <label className='label-negrita'>Universidad</label>
                  <label className='label-gris-universidad'>Selecciona tu universidad de pregrado. Si es que no está en la lista selecciona "Otra" e indica la carrera.</label>
                  <select
                    className='form-control'
                    name='universidad'
                    onChange={handleDropdownChange}>
                    <option value="">Selecciona una universidad:</option>
                    {datosUniversidades.map(universidad => (
                      <option key={universidad.id} value={universidad.nombre}>
                        {universidad.nombre}
                      </option>
                    ))}
                  </select>
                </div><div className='form-group'>
                  <label htmlFor="postgradoElection" className="label-negrita">Postgrado</label>
                  <label className='label-gris-postgrado'>Se considera como tal al que acredita la obtención de un grado académico equivalente a magíster o doctorado, otorgado por una universidad reconocida por el Estado, nacional o extranjera.</label>
                  <select
                    id="postgradoElection"
                    name="postgrado"
                    value={datos.postgrado || ''}
                    onChange={handleDropdownChange}
                    className="form-control">
                    <option value=''>No</option>
                    <option value="Si">Si</option>
                  </select>
                </div>
                </div>
                <div className='columna'>
                <div className='form-group'>
                <label className='label-negrita'>Profesión 2</label>
                <label className='label-gris'>Selecciona otra profesión si es que tienes</label>
                <select
                  className='form-control'
                  name='profesion2'
                  onChange={(event) => handleArray(event)}>
                  <option value="">Escoge una opcion</option>
                  {datosProfesiones.map(profesion => (
                    <option key={profesion.id} value={profesion.id}>
                      {profesion.nombre}
                    </option>
                  ))}
                </select>
              </div>
            {mostrarCuadroTextoPostgrado && (
              <div className='form-group'>
                <label htmlFor="postgrado" className="label-negrita">Qué postgrado tienes</label>
                <label className='label-gris'>Indicar título y universidad</label>
                <input
                  type="text"
                  id="postgrado"
                  name="postgrado"
                  onChange={handleInputChange}
                  className="form-control" />
              </div>
            )}
            </div>
            </div>
            </>)}
            {currentStep ===3 && (
              <><div className='contenedor-fila'>
              <label className='label-fila'>Estudios</label>
              <label className={`label-fila texto-subrayado`}>Laboral</label>
              <label className='label-fila'>Experiencia</label>
              </div>
              <div className='columnas'><div className='columna-izquierda'><div>
                {datosCargos ? (
                  <div className='form-group'>
                    <label className='label-negrita'>Cargo actual</label>
                    <label className='label-gris2'>Elige la opción que más se acomode a tu cargo. Si no tienes cargo selecciona "Ninguno"</label>
                    <select
                      className='form-control'
                      name="id_cargo"
                      onChange={(event) => handleDropdownChange(event)}>
                      <option value="">Selecciona un cargo:</option>
                      {datosCargos.map(cargo => (
                        <option key={cargo.id} value={cargo.id}>
                          {cargo.cargo}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : null}
              </div><div>
                  {datosIndustrias ? (
                    <div className='form-group'>
                      <label className='label-negrita'>Industria Actual</label>
                      <label className='label-gris2'>Se entiende como industria el área de la economía en la que tu empresa u organización se desempeña</label>
                      <select
                        className='form-control'
                        name='id_industria_actual'
                        onChange={(event) => handleDropdownChange(event)}>
                        <option value="">Escoga una opción</option>
                        {datosIndustrias.map(industria => (
                          <option key={industria.id} value={industria.id}>
                            {industria.nombre_industria}
                          </option>
                        ))}
                      </select>
                    </div>
                  ) : null}
                </div>
                {mostrarCargoAdicional && (
                  <><label></label>
                  <div className='form-group'>
                    <label className='label-negrita'>Cargo adicional o complementario</label>
                    <select
                      className='form-control'
                      name="id_cargo_adicional"
                      onChange={(event) => handleDropdownChange(event)}>
                      <option value="">Escoga una opción</option>
                      {datosCargos.map(cargo => (
                        <option key={cargo.id} value={cargo.id}>
                          {cargo.cargo}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className='form-group'>
                        <label className='label-negrita'>Industria adicional o complementaria</label>
                        <select
                          className='form-control-industriaAdicional'
                          name='id_industria_adicional'
                          onChange={(event) => handleDropdownChange(event)}>
                          <option value="">Escoga una opción</option>
                          {datosIndustrias.map(industria => (
                            <option key={industria.id} value={industria.id}>
                              {industria.nombre_industria}
                            </option>
                          ))}
                        </select>
                      </div></>
                )}
                </div>
                <div className='columna'>
                <div className='form-group'>
                  <label htmlFor="empresa" className="label-negrita">Empresa</label>
                  <label className='label-gris'>Nombre de la empresa en la que trabajas</label>
                  <input
                    type="text"
                    id="empresa"
                    name="empresa_actual"
                    value={datos.empresa_actual || ''}
                    onChange={handleInputChange}
                    className="form-control" />
                </div>
                <div className='form-group'>
                  <label htmlFor="rolAdicional" className="label-negrita2">¿Desempeñas algún otro rol, cargo o funcion actualmente?</label>
                  <select
                    id="rolAdicional"
                    name="rolAdicional"
                    className="form-control"
                    onChange={(event) => handleAdicional(event)}>
                    <option value="">No</option>
                    <option value="1">Si</option>
                  </select>
                </div>
              {mostrarCargoAdicional && (
                <><div className='form-group'>
                        <label htmlFor="empresa" className="label-negrita">Empresa adicional:</label>
                        <input
                          type="text"
                          id="empresa"
                          name="empresa_adicional"
                          value={datos.empresa_adicional || ''}
                          onChange={handleInputChange}
                          className="form-control" />
                      </div></>        
              )}</div></div></>
            )}
            {currentStep === 4 &&(
              <><div className='contenedor-fila'>
              <label className='label-fila'>Estudios</label>
              <label className='label-fila'>Laboral</label>
              <label className={`label-fila texto-subrayado`}>Experiencia</label>
              </div>
              <div className='columnas'>
                <div className='columna-izquierda'>
                <div className='form-group'>
                <label className='label-negrita'>Años de experiencia</label>
                <select
                  className='form-control'
                  name='id_anios_experiencia'
                  onChange={(event) => handleDropdownChange(event)}>
                  <option value="">Escoge una opción</option>
                  {datosAnios.map(rangos => (
                    <option key={rangos.id} value={rangos.id}>
                      {rangos.rango_experiencia_desde} - {rangos.rango_experiencia_hasta}
                    </option>
                  ))}
                </select>
              </div><div className='form-group'>
                  <label htmlFor="experienciaDireccion" className="label-negrita">Experiencia en directorios</label>
                  <label className='label-gris'>Esto significa ejercer o haber ejercido el rol e directora</label>
                  <select
                    id="experienciaDireccion"
                    name="experienciaDirectorios"
                    value={datos.experienciaDirectorios || ''}
                    onChange={(event) => handleDropdownChange(event)}
                    className="form-control">
                    <option value=''>Escoge una opción</option>
                    <option value={true}>Si</option>
                    <option value={false}>No</option>
                  </select>
                </div><div className='form-group'>
                  <label htmlFor="formacionDireccion" className="label-negrita">Formacion en alta dirección</label>
                  <select
                    id="formacionDireccion"
                    name="altaDireccion"
                    value={datos.altaDireccion || ''}
                    onChange={(event) => handleDropdownChange(event)}
                    className="form-control">
                    <option value=''>Escoge una opción</option>
                    <option value={true}>Si</option>
                    <option value={false}>No</option>
                  </select>
                </div><div className='form-group'>
                  <label className='label-negrita'>Áreas de experiencia</label>
                  <label className='label-roja'>Seleccionar máximo 5 respuestas</label>
                  <label className='label-gris2'>Si tienes conocimientos en lenguajes o herramientas tecnológicas, por favor indicar cuáles en la opción otra</label>
                  <div className='form-group'>
                    <Select 
                      className='form-control max-width'
                      multiple
                      value={opcionesArea}
                      onChange={handleSeleccion}
                      MenuProps={menuProps}
                      inputProps={{
                        name: 'areas',
                        id: 'opciones-multiple',
                      }}
                      >
                      {datosAreas.map(opcion =>(
                        <MenuItem key={opcion.id} value={opcion.id}>{opcion.nombre}</MenuItem>
                      ))}
                      </Select>
                  </div>
                </div>
                </div>
                <div className='columna'>
                <div className='form-group'>
                  <label className='label-negrita'>Sector o industria en la que tienes experiencia</label>
                  <label className='label-roja'>Seleccionar máximo 5 respuestas</label>
                  <Select 
                      className='form-control'
                      multiple
                      value={opcionesIndustria}
                      onChange={handleSeleccion}
                      MenuProps={menuProps}
                      inputProps={{
                        name: 'industriasExperiencia',
                        id: 'opciones-multiple',
                      }}
                      >
                      {datosIndustrias.map(opcion =>(
                        <MenuItem key={opcion.id} value={opcion.id}>{opcion.nombre_industria}</MenuItem>
                      ))}
                      </Select>
                </div><div className='form-group'>
                  <label className='label-negrita'>Competencias</label>
                  <label><span className='label-roja'>Seleccionar máximo 5 respuestas </span>
                  <span className='label-gris'>, priorizando las fortalezas y talentos que mas te representan</span></label>
                  <Select 
                      className='form-control'
                      multiple
                      value={opcionesCompetencia}
                      onChange={handleSeleccion}
                      MenuProps={menuProps}
                      inputProps={{
                        name: 'competencias',
                        id: 'opciones-multiple',
                      }}
                      >
                      {datosCompetencia.map(opcion =>(
                        <MenuItem key={opcion.id} value={opcion.id}>{opcion.competencia}</MenuItem>
                      ))}
                      </Select>
                  
                </div>
                </div>
                </div></>
            )}
            {currentStep===5 && (
              <>
              <div className={`columnas margin-columnas-top `}>
                <div className='columna-izquierda'>
              <div className='form-group'>
                <label className='label-negrita'>Disponibilidad</label>
                <label className='label-gris2'>Indica la modalidad en que estarías dispuesta asumir un nuevo trabajo, proyecto o asesoría</label>

                <select
                  className='form-control'
                  name='disponibilidad'
                  onChange={(event) => handleArray(event)}>
                  <option value="">Escoge una opción:</option>
                  {datosDisponibilidad.map(disponibilidad => (
                    <option key={disponibilidad.id} value={[disponibilidad.id]}>
                      {disponibilidad.disponibilidad}
                    </option>
                  ))}
                </select>
              </div><div className='form-group'>
                  <label className='label-negrita'>Disponibilidad de jornada</label>

                  <select
                    className='form-control'
                    name='id_jornada'
                    onChange={(event) => handleDropdownChange(event)}>
                    <option value="">Escoge una opción</option>
                    {datosJornada.map(jornada => (
                      <option key={jornada.id} value={jornada.id}>
                        {jornada.tipoJornada}
                      </option>
                    ))}
                  </select>
                </div>
                </div>
                <div className='columna'><div className='form-group'>
                  <label htmlFor="cambioRegion" className="label-negrita">Posibilidad de cambiarse de región</label>
                  <select
                    id="cambioRegion"
                    name="id_posibilidad_cambiarse_region"
                    onChange={handleDropdownChange}
                    className="form-control">
                    <option value=''>Escoge una opción</option>
                    <option value={1}>Si</option>
                    <option value={2}>No</option>
                  </select>
                </div><div className='form-group'>
                  <label className='label-negrita'>Modalidad de preferencia</label>

                  <select
                    className='form-control'
                    name='id_modalidad'
                    onChange={(event) => handleDropdownChange(event)}>
                    <option value="">Escoga una opción:</option>
                    {datosModalidades.map(modalidad => (
                      <option key={modalidad.id} value={modalidad.id}>
                        {modalidad.tipoModalidad}
                      </option>
                    ))}
                  </select>
                </div><div className='form-group'>
                  <label htmlFor="disposicionViajar" className="label-negrita">Disposición a viajar</label>
                  <select
                    id="disposicionViajar"
                    name="disposicion_viajar"
                    value={datos.disposicion_viajar || ''}
                    onChange={handleDropdownChange}
                    className="form-control">
                    <option value=''>Escoge una opción</option>
                    <option value={true}>Si</option>
                    <option value={false}>No</option>
                  </select>
                </div></div></div></>
            )}
            {currentStep===6 && (
              <>
              <div className={`columnas margin-columnas-top `}>
                <div className='columna-izquierda'>
              <div className='form-group'>
                <label htmlFor="dominioIdioma" className="label-negrita">Dominio de idioma medio-avanzado:</label>
                <select
                  className='form-control'
                  name='idiomas'
                  onChange={(event) => handleArray(event)}>
                  <option value="">Selecciona una opcion:</option>
                  {datosIdiomas.map(idioma => (
                    <option key={idioma.id} value={idioma.id}>
                      {idioma.nombre}
                    </option>
                  ))}
                </select>
              </div><div className='form-group'>
                  <label htmlFor="inclusionLaboral" className="label-negrita">Tiene algún factor de inclusión laboral</label>
                  <select
                    id="inclusionLaboral"
                    name="factor"
                    onChange={(event) => handleAdicional(event)}
                    className="form-control">
                    <option value="">No</option>
                    <option value="1">Si</option>
                  </select>
                </div>
            
            <div className='form-group'>
              <label htmlFor="compromisoRegion" className="label-negrita">Tiene algún compromiso con alguna región del pais</label>
              <select
                id="compromisoRegion"
                name="compromiso"
                onChange={(event) => handleAdicional(event)}
                className="form-control">
                <option value="">No</option>
                <option value="1">Si</option>
              </select>
            </div>
            <div className='form-group'>
              <label htmlFor="puebloIndigena" className="label-negrita">Se identifica con algún pueblo originario</label>
              <select
                id="puebloIndigena"
                name="pueblo"
                onChange={(event) => handleAdicional(event)}
                className="form-control">
                <option value="">No</option>
                <option value="1">Si</option>
              </select>
            </div>
            <div className='form-group'>
                <label htmlFor="wot" className="label-negrita">Cómo conocío WoT</label>
                <select
                  className='form-control'
                  name='id_conocio_wot'
                  onChange={(event) => handleDropdownChange(event)}>
                    <option value="">Selecciona una opcion:</option>
                    {datosWot.map( wot=> (
                      <option key={wot.id} value={wot.id}>
                        {wot.conocio}
                      </option>
                    ))}
                  </select>
              </div>
            </div>
            <div className='columna'>
            {mostrarFactor&& (
              <div className='form-group'>
                <label htmlFor="inclusionLaboralText" className="label-negrita">¿Cual es su factor de inclusión laboral?</label>
                <input
                  type="text"
                  id="inclusionLaboralText"
                  name="factor"
                  value={datos.factor || ''}
                  onChange={handleInputChange}
                  className="form-control" />
              </div>
            )}
            {mostrarCompromiso && (
              <div className='form-group'>
              <label className='label-negrita'>Selecciona la region con cual estas comprometida:</label>
                  <select
                  className='form-control'
                  name='id_region_con_compromiso'
                  onChange={(event) => handleDropdownChange(event)}>
                    <option value="">Selecciona tu region:</option>
                    {datosCompromiso.map(region=> (
                      <option key={region.id} value={region.id}>
                        {region.nombre}
                      </option>
                    ))}
                  </select>
              </div>
            )}
            {mostrarPueblo&& (
              <div className='form-group'>
                <label htmlFor="puebloIndigenaEleccion" className="label-negrita">Con que pueblo originario se identifica?</label>
                <input
                  type="text"
                  id="puebloIndigenaEleccion"
                  name="nombrePuebloOriginario"
                  value={datos.nombrePuebloOriginario || ''}
                  onChange={handleInputChange}
                  className="form-control" />
              </div>
            )}
            </div></div></>
            )}
            {currentStep===7 && (
              <><div className='columnas'>
                <div className='columna-izquierda-7'>
              <div className='form-group'>
                <label htmlFor="linkedin" className="label-negrita">Perfil de linkedin</label>
                <label className='label-gris'>Puede ser el perfil de RRSS que quieras compartir con nosotros.</label>
                <input
                  type="text"
                  id="linkedin"
                  name="redesSociales"
                  value={datos.redesSociales || ''}
                  onChange={handleInputChange}
                  className="form-control" />
              </div></div>
              <div className='columna-7'><div className='form-group'>
                  <label htmlFor="personalidad" className="label-negrita">Respuesta formulario de personalidad</label>
                  <label className='label-gris'>https://www.humanmetrics.com/personalidad/test</label>
                  <select
                    className='form-control'
                    name='id_personalidad'
                    onChange={(event) => handleDropdownChange(event)}>
                    <option value="">Selecciona una opcion:</option>
                    {datosPersonalidad.map(personalidad => (
                      <option key={personalidad.id} value={personalidad.id}>
                        {personalidad.personalidad}
                      </option>
                    ))}
                  </select>
                </div>
                </div>
                </div>
                <div className='form-group-brief'>
                  <label htmlFor="brief" className="label-negrita">Realiza un pequeño brief sobre ti </label>
                  <label className='label-gris'>Máximo 350 caracteres</label>
                  <input
                    type="text"
                    id="brief"
                    name="brief"
                    value={datos.brief || ''}
                    onChange={handleInputChange}
                    className="form-control-brief" />
                </div></>
            )}
            {currentStep===8 &&(
              <div className='columnas margin-columnas-top'>
                <div className='columna-izquierda'>
                  <label className='label-negrita'>Tiene algún contacto para validar la información</label>
                  <select
                    name="contacto1"
                    className='form-control'
                    onChange={handleAdicional}>
                    <option value=''>No</option>
                    <option value='1'>Si</option>
                  </select>
                {mostrarContacto1 && (
                  <><div className='form-group'>
                      <label className="label-negrita">Nombre Completo</label>
                      <input
                        type="text"
                        id="contacto_nombre1"
                        name="contacto_nombre1"
                        onChange={handleContactos}
                        className="form-control" />
                    </div><div className='form-group'>
                        <label className="label-negrita">Celular</label>
                        <input
                          type="text"
                          id="contacto_celular1"
                          name="contacto_celular1"
                          onChange={handleContactos}
                          className="form-control" />
                      </div></>
                )
                }
                </div>
                <div className='columna'>
                  {mostrarContacto1 && (
                      <div className='form-group'>
                        <label className="label-negrita">Mail</label>
                        <input
                          type="text"
                          id="contacto_mail1"
                          name="contacto_mail1"
                          onChange={handleContactos}
                          className="form-control" />
                      </div>
                
                  )}</div>
              </div>
            )}
            {currentStep===9 &&(
              <div className='columnas margin-columnas-top'>
                <div className='columna-izquierda'>
                <label className='label-negrita'>Tiene otro contacto para validar la información</label>
                  <select
                    name="contacto2"
                    className='form-control'
                    onChange={handleAdicional}>
                    <option value=''>No</option>
                    <option value='1'>Si</option>
                  </select>
                {mostrarContacto2 && (
                  <><div className='form-group'>
                      <label className="label-negrita">Nombre Completo</label>
                      <input
                        type="text"
                        id="contacto_nombre2"
                        name="contacto_nombre2"
                        onChange={handleContactos}
                        className="form-control" />
                    </div><div className='form-group'>
                        <label className="label-negrita">Celular</label>
                        <input
                          type="text"
                          id="contacto_celular2"
                          name="contacto_celular2"
                          onChange={handleContactos}
                          className="form-control" />
                      </div></>
                )
                }
                </div>
                <div className='columna'>
                {mostrarContacto2 && (
                      <div className='form-group'>
                        <label className="label-negrita">Mail</label>
                        <input
                          type="text"
                          id="contacto_mail2"
                          name="contacto_mail2"
                          onChange={handleContactos}
                          className="form-control" />
                      </div>
                
                  )}
                </div>
                
              </div>
            )}
            <div className='botones'>
            <button onClick={handleSubmit} className='siguiente-button'>Guardar Cambios</button>
            <button type="button" onClick={handlePrev} className='atras-button'>Atras</button>
            <button type="button" onClick={handleNext} className='siguiente-button'>Siguiente</button>
            </div>
          </form>
        </div>
      </Modal>

      <Modal
        isOpen={modalContraIsOpen}
        onRequestClose={() => setModalContraIsOpen(false)}
        contentLabel="Cambio Contraseña"
      >
        <h1>Cambia tu Contraseña</h1>
        <form onSubmit={changePassword}>
          <label className="label-negrita">Escribe tu contraseña actual:</label>
          <input type="password" name="oldPassword" className="form-contra"/>
          <p></p>
          <label className="label-negrita">Escribe tu nueva contraseña:</label>
          <input type="password" name="newPassword" className="form-contra"/>
          <p></p>
          <label className="label-negrita">Confirma tu nueva contraseña:</label>
          <input type="password" name="newPasswordConfirmation" className="form-contra"/>
          <p></p>
          <button type="submit" className="button-pink">Cambiar Contraseña</button>
        </form>
      </Modal>

    </div></>
);
}



export default Perfil;