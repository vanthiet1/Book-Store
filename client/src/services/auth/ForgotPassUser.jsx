import axios from "axios";
import { URL_API, URL_API_FORGOTPASS } from "../../utils/url-api";

const  verifyForgotPassword = async (emailUser) => {
    try {
        const response = await axios.post(`${URL_API}/${URL_API_FORGOTPASS}`,emailUser);
        return response.data;
    } catch (error) {
         console.log(error.response.data.message)
    }
}
export{
    verifyForgotPassword
}