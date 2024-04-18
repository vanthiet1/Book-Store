import axios from "axios";
import { URL_API ,URL_VERTIFY,URL_RESENDVERIFI } from "~/util/url-api";
import { toast } from 'react-toastify';


 const VertifyAuth = {


    VertifyAuth: async (userData) => {
        try {
            const response = await axios.post(`${URL_API}/${URL_VERTIFY}`, userData);
            console.log(response.data);
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
export  default VertifyAuth



