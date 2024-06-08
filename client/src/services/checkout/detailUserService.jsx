import {  URL_API_DETAIL_USER , URL_USER} from '../../utils/url-api';
import http from '~/utils/http';

const GetDetailUser = async (id) => {
    try {
        const response = await http.get(`${URL_API_DETAIL_USER}/${id}`);
        return response.data;
    } catch (error) {
        console.log(error.response.data.message);
    }
};

const GetDetailUserLoginGoogle = async (googleId) => {
    try {
        const response = await http.post(`${URL_USER}/googleId`,{googleId});
        return response.data;
    } catch (error) {
        console.log(error.response.data.message);
    }
};



const PostDetailUser = async (dataDetailUser) => {
    try {
        const response = await http.post(`${URL_API_DETAIL_USER}`, dataDetailUser);
        return response.data;
    } catch (error) {
        console.log(error.response.data.message);
    }
};
const UpdateDetailUser = async (userId, dataDetailUserUpdate) => {
    try {
        const response = await http.put(`${URL_API_DETAIL_USER}/${userId}`, dataDetailUserUpdate);
        return response.data;
    } catch (error) {
        console.log(error.response.data.message);
    }
};

export {
    GetDetailUser,
    PostDetailUser,
    UpdateDetailUser,
    GetDetailUserLoginGoogle
};
