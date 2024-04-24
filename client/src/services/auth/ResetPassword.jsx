import axios from "axios";
import { URL_API, URL_API_RESET_PASSWORD } from "../../utils/url-api";
import { toast } from "react-toastify";
const  ressetPassword = async (userId,newPassword) => {
    try {
        const response = await axios.put(`${URL_API}/${URL_API_RESET_PASSWORD}/${userId}`,newPassword);
        return response.data;
    } catch (error) {
        toast.error(error.response.data.message)
    }
}
export{
    ressetPassword
}