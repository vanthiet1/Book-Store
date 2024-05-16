import { API_BOOK_GENRES } from "../../../utils/url-api";
import { getNameBook } from "./getInforBook";
import http from "~/utils/http";

const AddGenres = async (nameGenre) => {
    try {
        const response = await http.post(`${API_BOOK_GENRES}`, nameGenre);
        return response.data
    } catch (error) {
        console.log(error);
    }
}
const GetDataGenres = async () => {
    try {
        const response = await http.get(`${API_BOOK_GENRES}`);
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
        const response = await http.delete(`${API_BOOK_GENRES}/${idGenres}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

const UpdateGenres = async (id, newData) => {
    try {
        const response = await http.put(`${API_BOOK_GENRES}/${id}`, newData);
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
