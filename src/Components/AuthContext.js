import React,{createContext,useContext,useEffect,useState} from "react";

import { useNavigate } from "react-router-dom";

const context = createContext();

export const Authprovider =({children})=>{


    const [isAuthenticated ,setIsAuthenticated]=useState(false);
    const navigate = useNavigate();
    useEffect(()=>{
        const storeAuth = localStorage.getItem('isAuthenticated');
        if(storeAuth === 'true'){
            setIsAuthenticated(true);
        }
    },[]);

    const login=()=>{
        setIsAuthenticated(true);
        localStorage.setItem('isAuthenticated','true');
      
        setTimeout(()=>{
            navigate("/home");
        },2000);
       
    };

    const logout=()=>{
        setIsAuthenticated(false);
        localStorage.removeItem('isAuthenticated');
        setTimeout(()=>{
            navigate("/home");
        },2000);
    };
    return(
        <context.Provider value={{isAuthenticated,login,logout}}>
            {children}
        </context.Provider>
    );
};

export const useAuth=()=>useContext(context);