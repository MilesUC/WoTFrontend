import React from 'react';
import '../Login/styles.css';
import { useState } from "react";
import { login } from '../../api';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import {HiEye, HiEyeOff} from "react-icons/hi";

export function Login() {
  const { register, handleSubmit } = useForm();
  const [datos, setDatos] = useState("");

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      let response = await login(data.mail, data.password);
      const responseData = await response.json();
      console.log('Response Data:', responseData);
      console.log(response.status);
      if (response.status === 200) {
        window.alert('Login successful!');
        const tokenTemporal = responseData.access_token;
        console.log(tokenTemporal);
        Cookies.set('jwtToken', tokenTemporal, { expires: 7 });
        const userId = responseData.id;
        console.log(userId);
        Cookies.set('userId', userId);
        navigate('/perfil');
      }
    } catch (error) {
      alert('Login failed. Please try again.');
      console.error(error);
    }
  };

  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [password, setPassword] = useState("");

  const passwordVisibility = () => {
    setMostrarPassword(!mostrarPassword);
  };

  return (
    <div className='center-content login_page_div'>
      <div className='row'>
        <div className='col images_col'>
          <img src="/images/logo.svg" className="logo_login"/>
          <img src='/images/image_inicio.png' className='woman_image'/>
          <h3 className='message_bottom'>Conectando talento</h3>
        </div>
        <div className='col form_col'>
          <form className='box' onSubmit={handleSubmit(onSubmit)}>
            <h1 className='sub_titulo'>Ingresa a WOT</h1>
            <input className='form_input' {...register("mail")} placeholder="Nombre o Email" />
            <div className="password-input">
              <div className="input-contenedor">
                <input
                  className='form_input'
                  {...register("password")}
                  type={mostrarPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Contraseña"
                />
                <span className="mostrar-password" onClick={passwordVisibility}>
                  {mostrarPassword ? <HiEye size={24}/> : <HiEyeOff size={24}/>}
                </span>
              </div>
            </div>
            <li><a className='olvidar_contra' href="#">¿Olvidaste tu contraseña?</a></li>
            
            <button className='login_button'>Entrar</button>
            <h4 className='register_or'>o</h4>
            <li><a className='register_link' href="/registro">Regístrate</a></li>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;