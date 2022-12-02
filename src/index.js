import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import NavigationContext from './NavigationContext';


ReactDOM.render(
  
    <NavigationContext>
      <App />
    </NavigationContext>,  
  
  document.getElementById('root')
);

