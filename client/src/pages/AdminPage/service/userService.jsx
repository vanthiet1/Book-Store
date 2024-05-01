import axios from "axios";
import { URL_API, URL_ALL_USER } from "../../../utils/url-api";

const GetAllUser = async () => {
    try {
        const response = await axios.get(`${URL_API}/${URL_ALL_USER}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

const DeleteUser = async (idUser) => {
    try {
        const response = await axios.delete(`${URL_API}/${URL_ALL_USER}/${idUser}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

const GetNameUser = async (userId) => {
    try {
        const response = await axios.get(`${URL_API}/user/${userId}`);
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