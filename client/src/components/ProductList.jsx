import React, { useState, useEffect } from "react";
import { get_allProducts } from "../api/product_opers";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { api } from "../api/config";
import './styles/ProductList.css';
import './styles/Cart.css';

function ProductList(){
    const [productList_products, setProductList_products] = useState([]);
    const [productList_cartProducts, setProductList_cartProducts] = useState([]);
    const [productList_cartProducts_totalQuantity, setProductList_cartProducts_totalQuantity] = useState(0);
    const [productList_cartProducts_totalPrice, setProductList_cartProducts_totalPrice] = useState(0);

    useEffect(() => {
        async function effect_function_getAllProducts() {
            try {
                const effect_function_getAllProducts_response = await get_allProducts();
                setProductList_products(effect_function_getAllProducts_response.data);
            } catch (error) {
                toast.error('An error occurred.');
                throw error;
            }
        }
        effect_function_getAllProducts();
    }, []);

    useEffect(() => {
        let totalQuantity = 0;
        let totalPrice = 0;
        productList_cartProducts.forEach(product => {
            totalQuantity += product.quantity;
            totalPrice += product.quantity * product.product_price;
        });
        setProductList_cartProducts_totalQuantity(totalQuantity);
        setProductList_cartProducts_totalPrice(totalPrice);
    }, [productList_cartProducts]);

    const event_function_addToCart = async function(productToAdd) {
        const updatedCartProducts = [...productList_cartProducts];
        const existingProductIndex = updatedCartProducts.findIndex(
            (product) => product.product_image_filepath === productToAdd.product_image_filepath
        );

        if (existingProductIndex !== -1) {
            updatedCartProducts[existingProductIndex].quantity += 1;
            setProductList_cartProducts(updatedCartProducts);
        } else {
            productToAdd.quantity = 1;
            setProductList_cartProducts([...productList_cartProducts, productToAdd]);
        }
    }

    const event_function_removeFromCart = (index) => {
        const updatedCartProducts = [...productList_cartProducts];
        if (updatedCartProducts[index].quantity === 1) {
            updatedCartProducts.splice(index, 1);
        } else {
            updatedCartProducts[index].quantity -= 1;
        }
        setProductList_cartProducts(updatedCartProducts);
    };
 
    return(
        <>
            <h2>Product List</h2>
            <div className="product-list-container-div">
                {productList_products.map((product) => (
                    <div key={product.id} onClick={() => event_function_addToCart(product)}>
                        <div className="product-card element-with-scroll">
                            <div className="product-card-image-container">
                                <img src={api.url+'/'+product.product_image_filepath} alt={product.product_name} className="product-image"/>
                            </div>
                            <h3>{product.product_name}</h3>
                            <span className="product-price">Price: ₱{product.product_price}</span>
                        </div>
                    </div>
                ))}
            </div>
            <div className="cart-details">
                <h2>Cart</h2>
                <p>Total Quantity: {productList_cartProducts_totalQuantity}</p>
                <p>Total Price: ₱{productList_cartProducts_totalPrice}</p>
                <div className="cart-products">
                    {productList_cartProducts.map((product, index) => (
                        <div key={index} className="cart-indiv-product">
                            <p>{product.product_name} - Quantity: {product.quantity}</p>
                            <button onClick={() => event_function_removeFromCart(index)} className="button">Remove</button>
                        </div>
                    ))}
                </div><br/><br/>
                <button className="button">CHECK OUT</button>
            </div>
            <br/>
            <ToastContainer/>
        </>
    );
}

export default ProductList;
