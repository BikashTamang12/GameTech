import React from 'react'
import "./HomeButton.css"
import { useNavigate } from 'react-router-dom'

const HomeButton = () => {
    const navigate =useNavigate();
    const handleClick=()=>{
        navigate('/adminPage');
    };
  return (
    <div>
        <div id='button'>
      <button id="testButton" onClick={handleClick}>Go to admin</button>
      </div>
    </div>
  )
}

export default HomeButton
