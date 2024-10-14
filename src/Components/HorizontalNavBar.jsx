import React from 'react'
import './HorizontialNavBar.css';
import { Link } from 'react-router-dom';

const HorizontalNavBar = () => {
  return (
    <div className='horizontal'>
        <Link to="/laptop" id='laptop'>Laptop</Link>
        <Link to="mouse" id='mouse'>Mouse</Link>
        <Link to="/keyboards" id='keyboard'>Keyboard</Link> 
        <Link to ="/headphones" id='headphone'>Headphones</Link>
         <Link to ="/joysticks" id='joystick'>Joystick</Link> 
         <Link to ="/xboxs" id='xbox'>X-Box</Link>
         <Link to ="/psps" id='psp'>Psp</Link>
         <Link to="/cds" id='cd'>CD</Link>
      
    </div>
  )
}

export default HorizontalNavBar
