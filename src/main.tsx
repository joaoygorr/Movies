import React from 'react';
import ReactDOM from 'react-dom/client';
// Router 
import { BrowserRouter } from 'react-router-dom';
import Router from './routes/Router';
import './Styles/global.css';
import GlobalStyled from "./Styles/global";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <GlobalStyled />
      <Router />
    </BrowserRouter>
  </React.StrictMode>,
)
