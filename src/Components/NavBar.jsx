import React, { useState } from "react";
import "../Components_CSS/NavBar.css";

import Logo from "./Images/gt_logo.png";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const [input, setInput] = useState("");
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleChange = (event) => {
    setInput(event.target.value);
  };


  const customerHome=()=>{
    navigate("/");
  }

  return (
    <div id="div1">
      <navbar id="nav1">
        <Link to="/" id="logo">
          <img src={Logo} className="Logo" alt="Company Logo" />
        </Link>
      
        <div className="logo-name" onClick={customerHome}>
          
          <p id="game-tech">Game-Tech</p>
        
        </div>
        

        <div className="typingAni">
          We are authorized | Genuine Products are available.
        </div>
        <div className="cartmodify">
          <Link to="/cart" id="cart">
           <AddShoppingCartIcon></AddShoppingCartIcon>
          </Link>
        </div>
        <div className="aboutmodify">
          <Link to="/about" id="aboutus">
            About Us
          </Link>
        </div>
        <div className="order2">
          <Link to="/customerorder" id="ordercustomer">
            My Order
          </Link>
        </div>

        <div className="loginmodify">
          {isAuthenticated ? (
            <button onClick={logout} id="logout">
              <LogoutIcon></LogoutIcon>
            </button>
          ) : (
            <Link to="/login" id="login">
             <LoginIcon></LoginIcon>
            </Link>
          )}
        </div>
      </navbar>
    </div>
  );
};

export default NavBar;
