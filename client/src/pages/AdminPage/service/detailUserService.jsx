
import { URL_API_DETAIL_USER } from "../../../utils/url-api";
import http from "~/utils/http";
const GetAllDetailUser = async (userId) => {
    try {
        const response = await http.get(`${URL_API_DETAIL_USER}/${userId}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}
export {
    GetAllDetailUser
}