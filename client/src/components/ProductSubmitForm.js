import React, { useState, useEffect } from "react";
import { submitProduct } from "../api/product_opers";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import '../App.css';

function ProductSubmitForm(){
    const [image, setImage] = useState(null);
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [isPng, setIsPng] = useState(false);
    const [imageUrl, setImageUrl] = useState(null);

    var bgColor = isPng? 'white': 'black';

    const pr_name = function(event) {
        setProductName(event.target.value);
    }
    const pr_price = function(event) {
        setProductPrice(event.target.value);
    }
    const pr_image = function(event) {
        try{
            const selectedImage = event.target.files[0];
            setImage(selectedImage);
            const selectedImageUrl = URL.createObjectURL(selectedImage);
            setImageUrl(selectedImageUrl);
            setIsPng(selectedImage.type === 'image/png');
        } catch(e) {}
    }

    const clearFormData = function(){
        setImage(null);
        setImageUrl(null);
        setProductName('');
        setProductPrice('');
    }

    const HandleProductSubmit = async function (event) {
        event.preventDefault();
        try {
            const result = await submitProduct(image, productName, productPrice);
            if (result.success) {
                toast.success('Product submitted successfully!');
                clearFormData();
            } else {
                toast.error(`Error submitting product: ${result.error}`);
            }
        } catch (error) {
            toast.error(`Error submitting product: ${error.message}`);
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
                            <input type="file" accept=".jpg,.png,.jpeg" onChange={pr_image} />
                        </label><br />
                        <label>
                            Product Name<br />
                            <input type="text" onChange={pr_name} value={productName} />
                        </label><br />
                        <label>
                            Product Price<br />
                            <input type="text" onChange={pr_price} value={productPrice} />
                        </label><br /><br />
                        <button type="button" className="button" onClick={HandleProductSubmit} style={{marginRight: '10px'}}>ADD PRODUCT</button>
                        <button type="button" className="button" onClick={clearFormData}>CLEAR DATA</button>
                    </form>
                </div>
                <div className="preview-div">
                    <h2>Preview:</h2>
                    <div className="previewCard">
                        <div style={{ 
                                width: '256px',
                                height: '256px',
                                backgroundColor: `${bgColor}`,
                                border: '1px solid black' 
                                    }}>
                            {imageUrl && <img src={imageUrl} alt="Product Preview" style={{ 
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                            }} />}
                        </div>
                        <h3>{productName}</h3>
                        <span style={{ 
                            position: 'relative',
                            top: '-15px' 
                                    }}>Price: ₱{productPrice}</span>
                    </div>
                </div>
            </div>
            <ToastContainer/>
        </>
    );
}

export default ProductSubmitForm;
