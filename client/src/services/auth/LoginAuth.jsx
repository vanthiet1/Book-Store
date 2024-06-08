import http from "~/utils/http";
export const LoginAuth = {
    login: async (userDataLogin, notificationError) => {
        try {
            const response = await http.post(`auth/login`, userDataLogin);
            return response.data.token;
        } catch (error) {
            notificationError(error.response.data.message);
        }
    },
    loginGoogle: async (data) => {
        try {
            const response = await http.post(`http://localhost:8080/api/v1/auth/login/google`, data);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
}

