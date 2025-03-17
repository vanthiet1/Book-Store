/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import http from "~/utils/http";
import { URL_USER } from "~/utils/url-api";

const GetUserData = async (token) => {
    try {
        const response = await http.get(`user`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error retrieving user data:", error);
        throw new Error("Đã xảy ra lỗi khi lấy dữ liệu người dùng");
    }
}

const GetUserDataLoginGoogle = async (token) => {
    try {
        const res = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });
      return res.data;
    } catch (error) {
        console.log(error);
    }
}

const GetUserById = async (userId) => {
    try {
        const response = await http.get(`${URL_USER}/${userId}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}
const GetUserGoogle = async (id) => {
    try {
        const response = await http.get(`${URL_USER}/detail/user/google/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}
export {
    GetUserData,
    GetUserById,
    GetUserDataLoginGoogle,
    GetUserGoogle
}
