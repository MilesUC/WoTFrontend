import React from 'react';
import '../Registro/styles.css';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { signup } from '../../api';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import {AiOutlineGoogle, AiFillLinkedin} from 'react-icons/ai';


export function Registro() {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const [datos, setDatos] = useState('');
  const navigate = useNavigate();


  const onSubmit = async (data) => {
    try {
      if (data.password != data.confirmPassword){
        alert('Las contraseñas no son iguales.');
      }
      else{
        let response = await signup(data.name, data.lastName, data.mail, data.password);
        const responseData = await response.json();
        console.log('Response Data:', responseData);
        console.log(response.status);
        if (response.status == 201) {
          const tokenTemporal = responseData.access_token;
          console.log(tokenTemporal);
          Cookies.set('jwtToken', tokenTemporal, { expires: 7 });
          const userId = responseData.id;
          console.log(userId);
          Cookies.set('userId', userId);
          alert('Signup successful!');
          navigate('/perfil');
        }
      }

    } catch (error) {
      alert('Signup failed. Please try again.');
      console.error(error);
    }
  };
  

  return (
    <div className='center-content register_div'>
      <div className='row'>
        <div className='col images_col'>
          <img src="/images/logo.svg" className="logo_login"/>
          <img src='/images/image_inicio.png' className='woman_image'/>
          <h3 className='message_bottom'>Conectando talento</h3>
        </div>
        <div className='col register_form_col'>
          <form className='box_reg' onSubmit={handleSubmit(onSubmit)}>
            <h1 className='sub_titulo_reg'>Registrate en WOT</h1>
            <div className='social_register_div'>
              <div className='row'>
                <h3 className='title_social_register'>Entra con</h3>
              </div>
              <div className='row social_register'>
                <div className='col'>
                  <button className='social_register_button'><AiOutlineGoogle/> Google</button>
                </div>
                <div className='col'>
                  <button className='social_register_button'><AiFillLinkedin/> Linkedin</button>
                </div>
              </div>
            </div>
            <input className='input_reg' {...register('name', { required: true })} placeholder='Nombre' />
            {errors.name && <p className="error">Email requerido</p>}
            <input className='input_reg' {...register('lastName', { required: true })} placeholder='Apellido' />
            {errors.lastName && <p className="error">Email requerido</p>}
            <input className='input_reg' {...register('mail', { required: true })} placeholder='Email' />
            {errors.mail && <p className="error">Email requerido</p>}
            <input className='input_reg' {...register('password', { required: true })} placeholder='Contraseña' />
            {errors.password && <p className="error">Contraseña requerida</p>}
            <input
              className='input_reg'
              {...register('confirmPassword', {
                required: true,
                validate: (value) => value === watch('password') // Validation for password confirmation
              })}
              placeholder='Confirme Contraseña'
            />
            {errors.confirmPassword && <p className="error">Las contraseñas deben ser iguales</p>}
            <button className='register_button'>Entra</button>
            <p>{datos}</p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Registro;
