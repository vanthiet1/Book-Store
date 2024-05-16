import { toast } from "react-toastify";
import { URL_API_RESET_PASSWORD } from "../../utils/url-api";
import http from "~/utils/http";
const  ressetPassword = async (userId,newPassword) => {
    try {
        const response = await http.put(`${URL_API_RESET_PASSWORD}/${userId}`,newPassword);
        return response.data;
    } catch (error) {
        toast.error(error.response.data.message)
    }
}
export{
    ressetPassword
}