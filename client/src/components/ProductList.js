import React, { useState, useEffect } from "react";
import '../App.css';
import { fetchProducts } from "../api/product_opers";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { api } from "../api/config";

export const ProductList = function(){
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
            <div>
            <h2>Product List</h2>
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Product Image</th>
                    <th>Product Name</th>
                    <th>Product Price</th>
                </tr>
                </thead>
                <tbody>
                {products.map((product) => (
                    <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>
                        <img src={api.url+'/'+product.product_image_filepath} alt={product.product_name} width="100" />
                    </td>
                    <td>{product.product_name}</td>
                    <td>{product.product_price}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
            <ToastContainer/>
        </>
    );
}
