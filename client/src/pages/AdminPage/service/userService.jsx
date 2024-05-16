
import { URL_ALL_USER } from "../../../utils/url-api";
import http from "~/utils/http";
const GetAllUser = async () => {
    try {
        const response = await http.get(`${URL_ALL_USER}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

const DeleteUser = async (idUser) => {
    try {
        const response = await http.delete(`${URL_ALL_USER}/${idUser}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

const GetNameUser = async (userId) => {
    try {
        const response = await http.get(`user/${userId}`);
        return response.data.email;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
export {
    GetAllUser,
    DeleteUser,
    GetNameUser
}