// Footer.js
import React from 'react';
import '../Footer/styles.css';
import { AiOutlineInstagram, AiOutlineFacebook } from 'react-icons/ai';


function Footer() {
  return (
    <footer className='footer_div'>
      <nav className='footer_nav'>
        <ul className='footer_ul'>
          <li><a href="#" className="footerlink">Contacto</a></li>
          <li><a href="#" className="footerlink">Empresa</a></li>
          <li><a href="#" className="footerlink">Sobre nosotros</a></li>
        </ul>
        <ul className='footer_ul'>
          <li><a href="#" className="sociallink"><AiOutlineInstagram size={32}/></a></li>
          <li><a href="#" className="sociallink"><AiOutlineFacebook size={32}/></a></li>
        </ul>
      </nav>    
    </footer>
  );
}

export default Footer;
