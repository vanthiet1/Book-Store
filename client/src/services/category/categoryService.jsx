import {  API_BOOK_CATEGORY } from '../../utils/url-api';
import http from '~/utils/http';
const CategoryBook = async () => {
    try {
        const response = await http.get(`${API_BOOK_CATEGORY}`);
        return response.data;
    } catch (error) {
        console.log(error.response.data.message);
    }
};

export {
    CategoryBook
};
