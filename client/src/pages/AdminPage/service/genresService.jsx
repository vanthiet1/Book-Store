import axios from "axios";
import { URL_API, API_BOOK_GENRES } from "../../../utils/url-api";
import { getNameBook } from "./getInforBook";


const AddGenres = async (nameGenre) => {
    try {
        const response = await axios.post(`${URL_API}/${API_BOOK_GENRES}`, nameGenre);
        return response.data
    } catch (error) {
        console.log(error);
    }
}
const GetDataGenres = async () => {
    try {
        const response = await axios.get(`${URL_API}/${API_BOOK_GENRES}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

const GetNameBookInGenres = async () => {
    try {
        const categories = await GetDataGenres();
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

const DeleteGenres = async (idGenres) => {
    try {
        const response = await axios.delete(`${URL_API}/${API_BOOK_GENRES}/${idGenres}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

const UpdateGenres = async (id, newData) => {
    try {
        const response = await axios.put(`${URL_API}/${API_BOOK_GENRES}/${id}`, newData);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}





export {
    AddGenres,
    GetNameBookInGenres,
    DeleteGenres,
    UpdateGenres,
    GetDataGenres
}
