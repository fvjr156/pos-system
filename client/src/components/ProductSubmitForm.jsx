import React, { useState } from "react";
import { post_uploadProduct } from "../api/product_opers";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import '../App.css';

function ProductSubmitForm(){
    const [productData_image, setProductData_image] = useState(null);
    const [productData_name, setProductData_name] = useState('');
    const [productData_price, setProductData_price] = useState('');
    const [productData_image_isPNG, setProductData_image_isPNG] = useState(false);
    const [productData_image_URL, setProductData_image_URL] = useState(null);

    var jsx_preview_backgroundColor = productData_image_isPNG? 'white': 'black';

    const event_change_productData_name = function(event) {
        setProductData_name(event.target.value);
    }
    const event_change_productData_price = function(event) {
        setProductData_price(event.target.value);
    }
    const event_change_productData_image = function(event) {
        try{
            const event_select_productData_image = event.target.files[0];
            setProductData_image(event_select_productData_image);
            const event_select_productData_image_URL = URL.createObjectURL(event_select_productData_image);
            setProductData_image_URL(event_select_productData_image_URL);
            setProductData_image_isPNG(event_select_productData_image.type === 'image/png');
        } catch(error) {
            throw error;
        }
    }

    const event_function_clearForm = function(){
        setProductData_image(null);
        setProductData_image_URL(null);
        setProductData_name('');
        setProductData_price('');
    }

    const event_function_uploadProduct = async function (event) {
        event.preventDefault();
        try {
            const event_function_uploadProduct_result = await post_uploadProduct(productData_image, productData_name, productData_price);
            if (event_function_uploadProduct_result.success) {
                toast.success('Product submitted successfully!');
                event_function_clearForm();
            } else {
                toast.error(`Error submitting product: ${event_function_uploadProduct_result.error}`);
            }
        } catch (error) {
            throw error;
        }
    }

    return (
        <>
            <div className="form-container">
                <div className="submitform-div">
                    <h1>Product Submit Form</h1>
                    <small>Add a product to the Inventory Management <br/>System's Products Database</small><br/><br/>
                    <form>
                        <label>
                            Product Image (JPEG/PNG)<br />
                            <input type="file" accept=".jpg,.png,.jpeg" onChange={event_change_productData_image} />
                        </label><br />
                        <label>
                            Product Name<br />
                            <input type="text" onChange={event_change_productData_name} value={productData_name} />
                        </label><br />
                        <label>
                            Product Price<br />
                            <input type="text" onChange={event_change_productData_price} value={productData_price} />
                        </label><br /><br />
                        <button type="button" className="button" onClick={event_function_uploadProduct} style={{marginRight: '10px'}}>ADD PRODUCT</button>
                        <button type="button" className="button" onClick={event_function_clearForm}>CLEAR DATA</button>
                    </form>
                </div>
                <div className="preview-div">
                    <h2>Preview:</h2>
                    <div className="previewCard">
                        <div style={{ 
                                width: '235px',
                                height: '235px',
                                backgroundColor: `${jsx_preview_backgroundColor}`,
                                border: '1px solid black' 
                                    }}>
                            {productData_image_URL && <img src={productData_image_URL} alt="Product" style={{ 
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                            }} />}
                        </div>
                        <h3>{productData_name}</h3>
                        <span style={{ 
                            position: 'relative',
                            top: '-15px' 
                                    }}>Price: ₱{productData_price}</span>
                    </div>
                </div>
            </div>
            <ToastContainer/>
        </>
    );
}

export default ProductSubmitForm;
