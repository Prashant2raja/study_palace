import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';            // ← import axios
import App from './App';
import './index.css';

// ← configure axios to point at your Railway backend
axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL;

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
