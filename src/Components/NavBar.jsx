import React, { useState } from 'react';
import './NavBar.css';
import Icon from './Images/search_icon.png'; // Import the search icon image
import Logo from './Images/gt_logo.png';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';

const NavBar = () => {
  const [input, setInput] = useState('');
  const { isAuthenticated, logout } = useAuth();

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  return (
    <div id='div1'>
      <navbar id="nav1">
      
        <Link to="/" id='logo'>
          <img src={Logo} className='Logo' alt='Company Logo' />
        </Link>
        
       <div className='typingAni'>
        We are authorized | Genuine Products are  available.
       </div>
       <div className='cartmodify'>
        <Link to="/cart" id='cart'>Cart</Link>
        </div>
        <div className='aboutmodify'>
        <Link to="/about" id='aboutus'>About Us</Link>
        </div>

  <div className='loginmodify'>
        {isAuthenticated ? (
          <button onClick={logout} id='logout'>Logout</button>
        ) : (
          <Link to="/login" id='login'>Login</Link>
        )}
        </div>
      </navbar>
    </div>
  );
};

export default NavBar;
