import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import Router from './routes/Router';
import GlobalStyled from "./Styles/global";
import { ToastContainer } from 'react-toastify';
import { Footer, Header } from "@/shared/Components";
import { QueryClientProvider, QueryClient } from "react-query";
import './Styles/global.css';
import "react-toastify/dist/ReactToastify.css";
import "primereact/resources/primereact.min.css";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <GlobalStyled />
        <ToastContainer />
        <Header />
          <Router />
        <Footer />
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
