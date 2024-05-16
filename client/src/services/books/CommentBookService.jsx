import { API_BOOK_COMMENT } from "~/utils/url-api";
import http from "~/utils/http";
const postCommentBook = async (bookId, data) => {
    try {
        const response = await http.post(`${API_BOOK_COMMENT}/${bookId}`, data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

const getCommentUser = async (bookId) => {
    try {
        const response = await http.get(`${API_BOOK_COMMENT}/${bookId}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

const getInforUserComment = async (userId) => {
    try {
        const response = await http.get(`user/${userId}`);
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