import React from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import ToastDemo from './ToastDemo';
import App from './App';
import { ProductSubmitForm } from './components/ProductSubmitForm';
import { ProductList } from './components/ProductList';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App/>}/>
        <Route path="/productsubmitform" element={<ProductSubmitForm/>}/>
        <Route path="/productlist" element={<ProductList/>}/>
        <Route path="/toastdemo" element={<ToastDemo/>}/>
      </Routes>
    </Router>
  </React.StrictMode>
);
