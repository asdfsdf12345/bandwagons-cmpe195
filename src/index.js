import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import NavigationContext from './NavigationContext';


ReactDOM.render(
  <React.StrictMode>
    <NavigationContext>
      <App />
    </NavigationContext>  
  </React.StrictMode>,
  document.getElementById('root')
);

