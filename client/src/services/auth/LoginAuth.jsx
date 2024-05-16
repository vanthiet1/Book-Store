import http from "~/utils/http";

export const LoginAuth = {
    login: async (userDataLogin, notificationError) => {
        try {
            const response = await http.post(`auth/login`, userDataLogin);
            return response.data.token;
        } catch (error) {
            notificationError(error.response.data.message);
        }
    }
}

