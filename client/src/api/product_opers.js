import axios from 'axios';
import { api } from './config';


//use this to fetch the products data from the database
export const fetchProducts = async function(){
    try{
        const response = await axios.get(`${api.url}/get-products`);
        return response;
    } catch(error){
        console.error('Error fetching products', error);
    }
}
//submit file and data here
export const submitProduct = async function(image, productName, productPrice){
    const formData  = new FormData();
    formData.append('image', image);
    formData.append('name', productName);
    formData.append('price', productPrice);

    try{
        const response  = await axios.post(`${api.url}/submit-product`, formData, {
            headers : {
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log("File uploaded successfully. ", response);
        return 0;

    } catch(error){
        console.error("Error uploading file.", error);
        return 1;

    }
}