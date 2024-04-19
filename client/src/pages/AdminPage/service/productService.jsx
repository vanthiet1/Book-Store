import axios from "axios";
import { URL_API, API_BOOK_CATEGORY, API_BOOK } from "../../../utils/url-api";

const GetDataBook = async () => {
    try {
        const response = await axios.get(`${URL_API}/${API_BOOK}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

const GetCategory = async (id) => {
    try {
        const response = await axios.get(`${URL_API}/${API_BOOK_CATEGORY}/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}
const GetNameCategory = async (categoryId) => {
    try {
        const category = await GetCategory(categoryId);
        return category.name;
    } catch (error) {
        console.log(error);
        return "";
    }
};

const DeleteAbook = async (bookId) => {
    try {
        const response = await axios.delete(`${URL_API}/${API_BOOK}/${bookId}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

const GetDescription = async (bookId) => {
    try {
        const response = await axios.get(` ${URL_API}/${API_BOOK}/${bookId}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

const AddBook = async (data) => {
    try {
        const response = await axios.post(`${URL_API}/${API_BOOK}`, data);
        return response.data;
    } catch (error) {
        console.error('Error adding book:', error);
    }
}
const UpdateBook = async (bookId, dataUpdated) => {
    try {
        const response = await axios.put(` ${URL_API}/${API_BOOK}/${bookId}`, dataUpdated);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export {
    GetDataBook,
    GetNameCategory,
    DeleteAbook,
    GetDescription,
    AddBook,
    UpdateBook

}