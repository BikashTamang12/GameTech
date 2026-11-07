import React, { createContext, useContext, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

//This helps to pass the state or share the resoucre in multiple components.
const context = createContext();

export const Authprovider = ({ children }) => {
  //this detemines the state of login system whether it is logged in or not.
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // this effect retrives the vlaue fron isAuthenticated stored in local storage .
  useEffect(() => {
    const storeAuth = localStorage.getItem("isAuthenticated");
    if (storeAuth === "true") {
      setIsAuthenticated(true);
    }
  }, []);
//manages the login state.
  const login = () => {
    setIsAuthenticated(true);
    localStorage.setItem("isAuthenticated", "true");
    const redirectTo = localStorage.getItem("redirectTo") || "/home";

    navigate("/home");
  };
//manages the logout state.
  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");

    navigate("/home");
  };
   {/*Wraps the children and pass the all ass values like login ...*/}
  return (
  
    <context.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </context.Provider>
  );
};

export const useAuth = () => useContext(context);
