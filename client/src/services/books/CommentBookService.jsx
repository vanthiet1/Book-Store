import axios from "axios"
import { URL_API, API_BOOK_COMMENT } from "~/utils/url-api";

const postCommentBook = async (bookId, data) => {
    try {
        const response = await axios.post(`${URL_API}/${API_BOOK_COMMENT}/${bookId}`, data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

const getCommentUser = async (bookId) => {
    try {
        const response = await axios.get(`${URL_API}/${API_BOOK_COMMENT}/${bookId}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

const getInforUserComment = async (userId) => {
    try {
        const response = await axios.get(`${URL_API}/user/${userId}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}
export {
    postCommentBook,
    getCommentUser,
    getInforUserComment
}