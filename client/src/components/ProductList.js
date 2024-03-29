import React, { useState, useEffect } from "react";
import { fetchProducts } from "../api/product_opers";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { api } from "../api/config";
import './styles/ProductList.css';
import './styles/Cart.css';

function ProductList(){
    const [products, setProducts] = useState([]);
    const [cartProducts, setCartProducts] = useState([]);
    const [cartTotalQuantity, setCartTotalQuantity] = useState(0);
    const [cartTotalPrice, setCartTotalPrice] = useState(0);

    useEffect(() => {
        async function fetchData() {
            try {
                const responseData = await fetchProducts();
                setProducts(responseData.data);
            } catch (error) {
                toast.error('Error fetching data.');
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        // Calculate total quantity and price
        let totalQuantity = 0;
        let totalPrice = 0;
        cartProducts.forEach(product => {
            totalQuantity += product.quantity;
            totalPrice += product.quantity * product.product_price;
        });
        setCartTotalQuantity(totalQuantity);
        setCartTotalPrice(totalPrice);
    }, [cartProducts]);

    const handleAddToCart = async function(productToAdd) {
        const updatedCartProducts = [...cartProducts];
        const existingProductIndex = updatedCartProducts.findIndex(
            (product) => product.product_image_filepath === productToAdd.product_image_filepath
        );

        if (existingProductIndex !== -1) {
            // If product already exists in cart, increment quantity and update total quantity and price
            updatedCartProducts[existingProductIndex].quantity += 1;
            setCartProducts(updatedCartProducts);
            toast.info('Product quantity incremented');
        } else {
            // If product doesn't exist in cart, add it with quantity 1 and update total quantity and price
            productToAdd.quantity = 1;
            setCartProducts([...cartProducts, productToAdd]);
            toast.success('Product added to cart');
        }
    }

    const handleRemoveFromCart = (index) => {
        const updatedCartProducts = [...cartProducts];
        if (updatedCartProducts[index].quantity === 1) {
            updatedCartProducts.splice(index, 1); // Remove product if quantity is 1
        } else {
            updatedCartProducts[index].quantity -= 1; // Decrement quantity if > 1
        }
        setCartProducts(updatedCartProducts);
    };
 
    return(
        <>
            <h2>Product List</h2>
            <div className="product-list-container-div">
                {products.map((product) => (
                    <div key={product.id} onClick={() => handleAddToCart(product)}>
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
                <p>Total Quantity: {cartTotalQuantity}</p>
                <p>Total Price: ₱{cartTotalPrice}</p>
                <div className="cart-products">
                    {cartProducts.map((product, index) => (
                        <div key={index}>
                            <p>{product.product_name} - Quantity: {product.quantity}</p>
                            <button onClick={() => handleRemoveFromCart(index)}>Remove</button>
                        </div>
                    ))}
                </div>
            </div>
            <ToastContainer/>
        </>
    );
}

export default ProductList;
