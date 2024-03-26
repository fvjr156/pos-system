import React from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import ToastDemo from './ToastDemo';
import App from './App';
import { ProductSubmitForm } from './components/ProductSubmitForm';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App/>}/>
        <Route path="/addproduct" element={<ProductSubmitForm/>}/>
        <Route path="/toastdemo" element={<ToastDemo/>}/>
      </Routes>
    </Router>
  </React.StrictMode>
);
