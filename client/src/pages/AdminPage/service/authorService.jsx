import axios from "axios";
import { URL_API , API_BOOK_AUTHOR , API_BOOK} from "../../../util/url-api";

const GetDataAuthor = async () => {
    try {
        const response = await axios.get(`${URL_API}/${API_BOOK_AUTHOR}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}
const GetNameBook= async (bookId) => {
    try {
        const response = await axios.get(`${URL_API}/${API_BOOK}/${bookId}`);
        return response.data.nameBook;
    } catch (error) {
        console.log(error);
        throw error; 
    }
};
const GetNameBookInAuthor = async () => {
    try {
        const categories = await GetDataAuthor();
        const booksData = {};

        await Promise.all(categories.map(async (category) => {
            const bookNames = await Promise.all(category.books.map(async (id) => {
                return await GetNameBook(id);
            })); 
            booksData[category._id] = bookNames;
        }));
        return booksData;
    } catch (error) {
        console.log(error);
    }
};
const DeleteAuthor = async (idCategory)=>{
    try {
        const response = await axios.delete(`${URL_API}/${API_BOOK_AUTHOR}/${idCategory}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}
const AddAuthor = async (nameAuthor)=>{
    try {
        const response = await axios.post(`${URL_API}/${API_BOOK_AUTHOR}`,nameAuthor);
        return response.data
    } catch (error) {
        console.log(error);
    }
}

export{
    GetDataAuthor,
    GetNameBookInAuthor,
    DeleteAuthor,
    AddAuthor
}