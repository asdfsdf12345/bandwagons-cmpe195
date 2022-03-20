import React, { createContext, useContext, useEffect, useState } from "react";

const Navigation = createContext();

const NavigationContext = ({ children }) => {

  useEffect(() => {
    
  },);

  return (
    <Navigation.Provider>
      {children}
    </Navigation.Provider>
  );
};

export default NavigationContext;

export const NavigationState = () => {
  return useContext(Navigation);
};