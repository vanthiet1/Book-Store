import { API_BOOK_BANNER } from "../../../utils/url-api";
import http from "~/utils/http";
const AddBanner = async (imageBanner) => {
    try {
        const response = await http.post(`${API_BOOK_BANNER}`, imageBanner);
        return response.data
    } catch (error) {
        console.log(error);
    }
}
const GetDataBanner = async () => {
    try {
        const response = await http.get(`${API_BOOK_BANNER}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}
const DeleteBanner = async (idBanner) => {
    try {
        const response = await http.delete(`${API_BOOK_BANNER}/${idBanner}`);
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