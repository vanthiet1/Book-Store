import { URL_AUTH_REGISTER } from "~/utils/url-api";
import http from "~/utils/http";
const RegisterAuth = {
    register: async (userData) => {
        try {
            const response = await http.post(`${URL_AUTH_REGISTER}`, userData);
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
