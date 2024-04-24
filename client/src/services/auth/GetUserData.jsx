
import { URL_API ,URL_USER} from "~/utils/url-api";
import axios from "axios";
const GetUserData = async (token) => {
    try {
        const response = await axios.get(`${URL_API}/user`, {
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
const GetUserById = async (userId)=>{
    try {
        const response = await axios.get(`${URL_API}/${URL_USER}/${userId}`);
        return response.data;
    } catch (error) {
         console.log(error);  
    } 
}

export {
    GetUserData,
    GetUserById
}
