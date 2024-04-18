import axios from 'axios';
import { URL_API } from "~/util/url-api";

const SearchBooks = async (keyword) => {
    console.log(keyword);
    try {
        const response = await axios.get(`${URL_API}/search/book?keyword=${keyword}`);
        return response.data;
    } catch (error) {
        console.log(error.response.data.message);
    }
};

export {
    SearchBooks
};
