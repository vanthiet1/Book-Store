import http from "~/utils/http";
import {URL_API_FORGOTPASS } from "../../utils/url-api";

const  verifyForgotPassword = async (emailUser) => {
    try {
        const response = await http.post(`${URL_API_FORGOTPASS}`,emailUser);
        return response.data;
    } catch (error) {
         console.log(error.response.data.message)
    }
}
export{
    verifyForgotPassword
}