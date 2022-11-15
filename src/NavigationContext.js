import { onAuthStateChanged } from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "./firebase";

const Navigation = createContext();

const NavigationContext = ({ children }) => {

  const[user, setUser] = useState(null);
  const[alert, setAlert] = useState({
    open:false,
    message:'',
    type: " success"
  })

  useEffect(() => {

    onAuthStateChanged(auth, (user) => {
      if (user) setUser(user);
      else setUser(null);
    });
  }, []);

  return (

    <Navigation.Provider
      value={{
        alert,
        setAlert,
        user,
        
      }}
    >
      {children}
    </Navigation.Provider>
  );
};

export default NavigationContext;

export const NavigationState = () => {
  return useContext(Navigation);
};

