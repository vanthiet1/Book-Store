import http from "~/utils/http";
import { API_BOOK_BANNER } from "../../utils/url-api";

const GetDataBanner = async () => {
    try {
        const response = await http.get(`${API_BOOK_BANNER}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}
export{
    GetDataBanner
}