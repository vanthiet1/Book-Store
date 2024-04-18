import axios from "axios";
import { URL_API , API_BOOK_CATEGORY } from "../../../util/url-api";
import { getNameBook } from "./getInforBook";


const AddCategory = async (nameCategory)=>{
    try {
        const response = await axios.post(`${URL_API}/${API_BOOK_CATEGORY}`,nameCategory);
        return response.data
    } catch (error) {
        console.log(error);
    }
}

const GetDataCategory = async () => {
    try {
        const response = await axios.get(`${URL_API}/${API_BOOK_CATEGORY}`);
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

const DeleteCategory = async (idCategory)=>{
    try {
        const response = await axios.delete(`${URL_API}/${API_BOOK_CATEGORY}/${idCategory}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

const UpdateCategory = async (id,newData)=>{
    try {
        const response = await axios.put(`${URL_API}/${API_BOOK_CATEGORY}/${id}`,newData);
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
