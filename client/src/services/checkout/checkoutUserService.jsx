import { URL_API_CHECKOUT } from '../../utils/url-api';
import http from '~/utils/http';

const PostCheckoutUser = async (dataDetailUser) => {
    try {
        const response = await http.post(`${URL_API_CHECKOUT}`, dataDetailUser);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

const GetDataUserCheckout = async (userId) => {
    try {
        const response = await http.get(`${URL_API_CHECKOUT}/${userId}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}
const DeleteDataUserCheckout = async (id) => {
    try {
        const response = await http.delete(`${URL_API_CHECKOUT}/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}


export {
    PostCheckoutUser,
    GetDataUserCheckout,
    DeleteDataUserCheckout
}