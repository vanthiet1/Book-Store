import axios from "axios";
import { URL_API } from "~/util/url-api";

export const LoginAuth = {
   
    login: async (userDataLogin , notificationError) => {
        try {
            const response = await axios.post(`${URL_API}/auth/login`, userDataLogin);
            return response.data.token;
        } catch (error) {
            notificationError(error.response.data.message);
        }
    }
    
}

