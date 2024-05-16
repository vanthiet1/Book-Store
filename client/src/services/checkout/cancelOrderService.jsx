import { URL_API_CHECKOUT } from '../../utils/url-api';
import http from '~/utils/http';
const CancelOrder = async (orderId) => {
    const response = await http.put(`${URL_API_CHECKOUT}/${orderId}`);
    return response.data;
};


export {
    CancelOrder,
}
