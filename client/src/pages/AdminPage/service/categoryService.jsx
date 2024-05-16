import { API_BOOK_CATEGORY } from "../../../utils/url-api";
import { getNameBook } from "./getInforBook";
import http from "~/utils/http";

const AddCategory = async (nameCategory) => {
    try {
        const response = await http.post(`${API_BOOK_CATEGORY}`, nameCategory);
        return response.data
    } catch (error) {
        console.log(error);
    }
}

const GetDataCategory = async () => {
    try {
        const response = await http.get(`${API_BOOK_CATEGORY}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

const GetNameBookInCategory = async () => {
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

const DeleteCategory = async (idCategory) => {
    try {
        const response = await http.delete(`${API_BOOK_CATEGORY}/${idCategory}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

const UpdateCategory = async (id, newData) => {
    try {
        const response = await http.put(`${API_BOOK_CATEGORY}/${id}`, newData);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}





export {
    GetDataCategory,
    GetNameBookInCategory,
    DeleteCategory,
    AddCategory,
    UpdateCategory,
}
