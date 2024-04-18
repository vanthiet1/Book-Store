import axios from 'axios';
import { URL_API ,URL_API_CHECKOUT} from '../../util/url-api';

const PostCheckoutUser = async (dataDetailUser) => {
    try {
        const response = await axios.post(`${URL_API}/${URL_API_CHECKOUT}`,dataDetailUser);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

const GetDataUserCheckout = async (userId) => {
    try {
        const response = await axios.get(`${URL_API}/${URL_API_CHECKOUT}/${userId}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}
const DeleteDataUserCheckout = async (id) => {
    try {
        const response = await axios.delete(`${URL_API}/${URL_API_CHECKOUT}/${id}`);
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