import axios from 'axios';
import { api } from './config';


export const get_allProducts = async function(){
    try{
        const response = {
          get_message: 'Data fetch successful.',
          product_data: await axios.get(`${api.url}/get-allproducts`)
        };
        return response.product_data;
    } catch(error){
        throw error;
    }
}
export const post_uploadProduct = async function(product_image, product_name, product_price) {
    const formData = new FormData();
    formData.append('key_productImage', product_image);
    formData.append('key_productName', product_name);
    formData.append('key_productPrice', product_price);
  
    try {
        await axios.post(`${api.url}/post-uploadproduct`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }});
        return {success: true};
    } catch (error) {
        throw error;
    }
  }