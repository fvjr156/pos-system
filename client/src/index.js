import React from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import ToastDemo from './ToastDemo';
import App from './App';
import ProductSubmitForm from './components/ProductSubmitForm';
import ProductList from './components/ProductList';
import LoadingComponent from './components/LoadingComponent';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App/>}/>
        <Route path="/productsubmitform" element={<ProductSubmitForm/>}/>
        <Route path="/productlist" element={<ProductList/>}/>
        <Route path="/toastdemo" element={<ToastDemo/>}/>
        <Route path="/load" element={<LoadingComponent/>}/>
      </Routes>
    </Router>
  </React.StrictMode>
  //access pages like these for now, code muna ung features bago lagyan ng main screen toolbar and sidebar tas
  //nag aaral pa akong routing and having finished code sa components can make routing easier and d nakakalito
);
