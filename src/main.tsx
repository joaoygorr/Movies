import React from 'react';
import ReactDOM from 'react-dom/client';
// Router 
import { RouterProvider } from "react-router-dom";
import Router from './routes/Router';
import './Styles/global.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={Router} />
  </React.StrictMode>,
)
