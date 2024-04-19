import axios from "axios";
import { URL_API, API_BOOK_BANNER } from "../../../utils/url-api";

const AddBanner = async (imageBanner) => {
    try {
        const response = await axios.post(`${URL_API}/${API_BOOK_BANNER}`, imageBanner);
        return response.data
    } catch (error) {
        console.log(error);
    }
}
const GetDataBanner = async () => {
    try {
        const response = await axios.get(`${URL_API}/${API_BOOK_BANNER}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}
const DeleteBanner = async (idBanner) => {
    try {
        const response = await axios.delete(`${URL_API}/${API_BOOK_BANNER}/${idBanner}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}
export {
    AddBanner,
    GetDataBanner,
    DeleteBanner
}