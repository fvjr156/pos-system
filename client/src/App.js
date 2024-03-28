import React, { useState } from 'react';
import { /*toast,*/ ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './App.css';
import { Navigate } from 'react-router-dom';

function App() {

    // useEffect(function(){
    //     toast('diag: toast is working!');
    // },[]);

    const [redirectToProductSubmitForm, setRedirectToProductSubmitForm] = useState(false);
    const [redirectToProductList, setRedirectToProductList] = useState(false);

    const goToProductSubmitForm = () => {
    setRedirectToProductSubmitForm(true);
    };

    if (redirectToProductSubmitForm) {
    return <Navigate to="/productsubmitform" />;
    }

    const goToProductList = () => {
    setRedirectToProductList(true);
    };

    if (redirectToProductList) {
    return <Navigate to="/productlist" />;
    }

    return (
        <>
            <h2>Point-of-Sales System BETA</h2>
            <div>
                <button className='button' onClick={goToProductSubmitForm}>Product Submit Form<br/><small>Add products to the IMS' Products Database</small></button>
                <br/><br/>
                <button className='button' onClick={goToProductList}>Point-of-Sales (ProductList) beta<br/><small>Manage and create sales transactions</small></button>
            </div>
            <ToastContainer />
        </>
    );
}
export default App;