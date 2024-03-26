import axios from 'axios';


//use this to fetch the products data from the database
export const fetchProducts = async function(){
    try{

    } catch(error){

    }
}
//submit file and data here
export const submitProduct = async function(image, productName, productPrice){
    const formData  = new FormData();
    formData.append('image', image);
    formData.append('name', productName);
    formData.append('price', productPrice);

    try{
        const response  = await axios.post('http://localhost:5001/submit-product', formData, {
            headers : {
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log("File uploaded successfully. ", response);

    } catch(error){
        console.error("Error uploading file.", error);

    }
}