import axios from "axios";
import { URL_API, API_BOOK_BANNER } from "../../utils/url-api";

const GetDataBanner = async () => {
    try {
        const response = await axios.get(`${URL_API}/${API_BOOK_BANNER}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}
export{
    GetDataBanner
}