import React, { createContext, useContext, useEffect, useState } from "react";

const Navigation = createContext();

const NavigationContext = ({ children }) => {
  const[user, setUser] = useState(null);
  const[alert, setAlert] = useState({
    open:false,
    message:'',
    type: " success"
  })

  useEffect(() => {
    
  },);

  return (
    <Navigation.Provider
      value={{
        alert,
        setAlert,
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

