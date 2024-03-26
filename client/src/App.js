import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './App.css';
import { Navigate } from 'react-router-dom';

function App() {

    // useEffect(function(){
    //     toast('diag: toast is working!');
    // },[]);

    const [redirect, setRedirect] = useState(false);

    const goToProductSubmitForm = () => {
        setRedirect(true);
    };

    if (redirect) {
        return <Navigate to="/addproduct" />;
    }

    return (
        <>
            <h2>Point-of-Sales System BETA</h2>
            <div>
                <button className='button' onClick={goToProductSubmitForm}>Product Submit Form<br/><small>Add products to the IMS' Products Database</small></button>
            </div>
            <ToastContainer />
        </>
    );
}
export default App;