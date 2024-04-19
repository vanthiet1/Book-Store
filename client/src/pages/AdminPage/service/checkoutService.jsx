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
        return response.data;
    } catch (error) {
        console.log(error);
    }
}
export {
    GetDataUserCheckout,
    GetAnDataUserCheckout
}
