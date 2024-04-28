import axios from "axios";
import { URL_API, URL_API_DETAIL_USER } from "../../../utils/url-api";

const GetAllDetailUser = async (userId) => {
    try {
        const response = await axios.get(`${URL_API}/${URL_API_DETAIL_USER}/${userId}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}
export {
    GetAllDetailUser
}