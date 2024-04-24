import axios from "axios";
import { toast } from 'react-toastify';
import { URL_API, URL_VERTIFY, URL_RESENDVERIFI } from "~/utils/url-api";


const VertifyAuth = {
    VertifyAuth: async (userData) => {
        try {
            const response = await axios.post(`${URL_API}/${URL_VERTIFY}`, userData);
            toast.success(response.data.message)
            return response.data;

        } catch (error) {
            toast.error(error.response.data.message)
        }
    },

    ResendVerifiAuth: async (emailUser) => {
        try {
            const response = await axios.post(`${URL_API}/${URL_RESENDVERIFI}`, emailUser);
            toast.success(response.data.message)

            return response.data;
        } catch (error) {
            toast.error(error.response.data.message)
        }
    },
};
export default VertifyAuth;



