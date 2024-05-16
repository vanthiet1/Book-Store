
import { API_BOOK } from "../../../utils/url-api";
import { GetDataCategory } from "./categoryService";
import { GetDataGenres } from "./genresService";
import http from "~/utils/http";

const getAllInforBook = async (bookId) => {
    try {
        const response = await http.get(`${API_BOOK}/${bookId}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
const getNameBook = async (bookId) => {
    try {
        const response = await http.get(`${API_BOOK}/${bookId}`);
        return response.data.nameBook;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
const getNameUser = async (userId) => {
    try {
        const response = await http.get(`user/${userId}`);
        return response.data.email;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
const getNameBookInCategory = async () => {
    try {
        const categories = await GetDataCategory();
        const booksData = {};

        await Promise.all(categories.map(async (category) => {
            const bookNames = await Promise.all(category.books.map(async (id) => {
                return await getNameBook(id);
            }));
            booksData[category._id] = bookNames;
        }));
        return booksData;
    } catch (error) {
        console.log(error);
    }
};
const getNameBookInGenres = async () => {
    try {
        const genres = await GetDataGenres();
        const booksData = {};

        await Promise.all(genres.map(async (genres) => {
            const bookNames = await Promise.all(genres.books.map(async (id) => {
                return await getNameBook(id);
            }));
            booksData[genres._id] = bookNames;
        }));

        return booksData;
    } catch (error) {
        console.log(error);
    }
};

export {
    getNameBookInCategory,
    getNameBook,
    getNameUser,
    getNameBookInGenres,
    getAllInforBook
}