import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import Router from './routes/Router';
import "./Styles/global.scss"
import { ToastContainer } from 'react-toastify';
import { Footer, Header } from "@/shared/Components";
import { QueryClientProvider, QueryClient } from "react-query";
import './Styles/tailwind.css';
import "react-toastify/dist/ReactToastify.css";
import 'primeicons/primeicons.css';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ToastContainer />
        <Header />
          <Router />
        <Footer />
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
