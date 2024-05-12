import axios from "axios";
import { URL_API, URL_API_CHECKOUT } from "../../../utils/url-api";

const GetDataUserCheckout = async () => {
    try {
        const response = await axios.get(`${URL_API}/${URL_API_CHECKOUT}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}
const GetAnDataUserCheckout = async (userId) => {
    try {
        const response = await axios.get(`${URL_API}/${URL_API_CHECKOUT}/${userId}`);
        console.log(response);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}
const DeleteOrderCheckout = async (orderId)=>{
    try {
        const response = await axios.delete(`${URL_API}/${URL_API_CHECKOUT}/${orderId}`);
        return response.data;
    } catch (error) {
        console.log(error);
    } 
}
const UpdateOrderCheckout = async (orderId)=>{
     try {
        const response = await axios.put(`${URL_API}/${URL_API_CHECKOUT}/${orderId}`);
        return response.data;
     } catch (error) {
         console.log(error);
     }
}
export {
    GetDataUserCheckout,
    GetAnDataUserCheckout,
    DeleteOrderCheckout,
    UpdateOrderCheckout
}
