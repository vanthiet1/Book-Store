
import axios from "axios";
import { URL_API, API_BOOK_COMMENT } from "../../../utils/url-api";
import { getNameBook, getNameUser } from "./getInforBook";


const GetDataComment = async () => {
    try {
        const response = await axios.get(`${URL_API}/${API_BOOK_COMMENT}`);
        return response.data;
    } catch (error) {
        console.log("Error fetching comments:", error);
        throw error;
    }
};

const GetNameBookInComment = async () => {
    try {
        const comments = await GetDataComment();
        const bookNames = [];
        await Promise.all(comments.map(async (comment) => {
            const bookName = await getNameBook(comment.book);
            bookNames.push(bookName);
        }));
        return bookNames;
    } catch (error) {
        console.log("Error processing comments:", error);
        throw error;
    }
};

const GetNameUserInComment = async () => {
    try {
        const comments = await GetDataComment();
        const nameUser = [];

        await Promise.all(comments.map(async (comment) => {
            const name = await getNameUser(comment.user);
            console.log(name);
            nameUser.push(name)
            return name
        }));
        return nameUser
    } catch (error) {
        console.log("Error processing comments:", error);
        throw error;
    }
};
const DeleteComment = async (idComment) => {
    try {
        const response = await axios.delete(`${URL_API}/${API_BOOK_COMMENT}/${idComment}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}
export {
    DeleteComment,
    GetNameBookInComment,
    GetDataComment,
    GetNameUserInComment
};