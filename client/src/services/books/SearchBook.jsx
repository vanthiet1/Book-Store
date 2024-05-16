import http from '~/utils/http';

const SearchBooks = async (keyword) => {
    try {
        const response = await http.get(`search/book?keyword=${keyword}`);
        return response.data;
    } catch (error) {
        console.log(error.response.data.message);
    }
};

export {
    SearchBooks
};
