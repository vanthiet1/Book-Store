
import { URL_API_CHECKOUT } from "../../../utils/url-api";
import http from "~/utils/http";
const GetDataUserCheckout = async () => {
    try {
        const response = await http.get(`${URL_API_CHECKOUT}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}
const GetAnDataUserCheckout = async (userId) => {
    try {
        const response = await http.get(`${URL_API_CHECKOUT}/${userId}`);
        console.log(response);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}
const DeleteOrderCheckout = async (orderId)=>{
    try {
        const response = await http.delete(`${URL_API_CHECKOUT}/${orderId}`);
        return response.data;
    } catch (error) {
        console.log(error);
    } 
}
const UpdateOrderCheckout = async (orderId)=>{
     try {
        const response = await http.put(`${URL_API_CHECKOUT}/${orderId}`);
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
