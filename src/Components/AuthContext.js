import React, { createContext, useContext, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

const context = createContext();

export const Authprovider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const storeAuth = localStorage.getItem("isAuthenticated");
    if (storeAuth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const login = () => {
    setIsAuthenticated(true);
    localStorage.setItem("isAuthenticated", "true");
    const redirectTo = localStorage.getItem("redirectTo") || "/home";

    navigate("/home");
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");

    navigate("/home");
  };
  return (
    <context.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </context.Provider>
  );
};

export const useAuth = () => useContext(context);
