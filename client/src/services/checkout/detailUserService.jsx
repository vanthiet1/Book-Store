import axios from 'axios';
import { URL_API, URL_API_DETAIL_USER } from '../../utils/url-api';

const GetDetailUser = async (id) => {
    try {
        const response = await axios.get(`${URL_API}/${URL_API_DETAIL_USER}/${id}`);
        return response.data;
    } catch (error) {
        console.log(error.response.data.message);
    }
};

const PostDetailUser = async (dataDetailUser) => {
    try {
        const response = await axios.post(`${URL_API}/${URL_API_DETAIL_USER}`, dataDetailUser);
        return response.data;
    } catch (error) {
        console.log(error.response.data.message);
    }
};
const UpdateDetailUser = async (userId, dataDetailUserUpdate) => {
    try {
        const response = await axios.put(`${URL_API}/${URL_API_DETAIL_USER}/${userId}`, dataDetailUserUpdate);
        return response.data;
    } catch (error) {
        console.log(error.response.data.message);
    }
};

export {
    GetDetailUser,
    PostDetailUser,
    UpdateDetailUser
};
