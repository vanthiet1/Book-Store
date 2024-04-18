import axios from 'axios';
import { URL_API, URL_API_CHECKOUT } from '../../util/url-api';

const CancelOrder = async (orderId) => {
    const response = await axios.put(`${URL_API}/${URL_API_CHECKOUT}/${orderId}`);
    return response.data;
};


export {
    CancelOrder,
}
