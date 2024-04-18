import axios from "axios";
import { URL_API, URL_AUTH_REGISTER } from "../../util/url-api";
const RegisterAuth = {
    register: async (userData) => {
        try {
            const response = await axios.post(`${URL_API}/${URL_AUTH_REGISTER}`, userData);
            if (response.data.token) {
                localStorage.setItem('user', JSON.stringify(response.data));
            }
            return response.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
  
};

export { RegisterAuth };
