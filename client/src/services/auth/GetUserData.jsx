
import { URL_API } from "~/util/url-api";
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

export {
    GetUserData
}
