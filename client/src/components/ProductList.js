import React, { useState, useEffect } from "react";
import '../App.css';
import { fetchProducts } from "../api/product_opers";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { api } from "../api/config";
import './styles/ProductList.css';

function ProductList(){
    const [products, setProducts] = useState([]);

    useEffect(()=>{
        async function fetchData(){
            try{
                const responseData = await fetchProducts();
                setProducts(responseData.data);
            }
            catch (error){
                toast.error('Error fetching data.');
            }
        }
        fetchData();
    }, []);

    return(
        <>
            <h2>Product List</h2>
            <div className="product-list-container-div">
                {products.map((product) => (
                    <div>
                        <div className="product-card element-with-scroll" key={product.id}>
                            <div className="product-card-image-container">
                                {<img src={api.url+'/'+product.product_image_filepath} alt={product.product_name} className="product-image"/>}
                            </div>
                            <h3>{product.product_name}</h3>
                            <span className="product-price">Price: ₱{product.product_price}</span>
                        </div>
                    </div>
                ))}
            </div>
            <ToastContainer/>
            
        </>
    );
}

export default ProductList;
