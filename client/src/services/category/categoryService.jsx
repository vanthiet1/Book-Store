import axios from 'axios';
import { URL_API, API_BOOK_CATEGORY } from '../../utils/url-api';

const CategoryBook = async () => {
    try {
        const response = await axios.get(`${URL_API}/${API_BOOK_CATEGORY}`);
        return response.data;
    } catch (error) {
        console.log(error.response.data.message);
    }
};

export {
    CategoryBook
};
