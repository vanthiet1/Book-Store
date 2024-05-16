import http from "~/utils/http";
import { URL_USER} from "~/utils/url-api";
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
const GetUserById = async (userId)=>{
    try {
        const response = await http.get(`${URL_USER}/${userId}`);
        return response.data;
    } catch (error) {
         console.log(error);  
    } 
}

export {
    GetUserData,
    GetUserById
}
