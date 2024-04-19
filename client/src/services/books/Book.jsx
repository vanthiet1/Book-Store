import axios from 'axios';
import { URL_API, API_BOOK, API_BOOK_CATEGORY } from "~/utils/url-api";


const GetInforBook = async (bookId) => {
    try {
        const response = await axios.get(`${URL_API}/${API_BOOK}/${bookId}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const BookNewApi = async () => {
    try {
        const response = await axios.get(`${URL_API}/${API_BOOK_CATEGORY}`);
        const buyCategory = response.data.find(category => category.name === 'Mua lẻ');
        if (buyCategory) {
            const productsResponse = await axios.get(`${URL_API}/${API_BOOK_CATEGORY}/${buyCategory._id}`);
            return productsResponse.data.books;
        }
    } catch (error) {
        console.error('Error fetching free books data:', error);
        throw error;
    }
};

const BookFreeApi = async () => {
    try {
        const response = await axios.get(`${URL_API}/${API_BOOK_CATEGORY}`);
        const freeCategory = response.data.find(category => category.name === 'Sách miễn phí');
        if (freeCategory) {
            const productsResponse = await axios.get(`${URL_API}/${API_BOOK_CATEGORY}/${freeCategory._id}`);
            return productsResponse.data.books;
        }
    } catch (error) {
        console.error('Error fetching free books data:', error);
        throw error;
    }
};
export {
    GetInforBook,
    BookNewApi,
    BookFreeApi
}