<<<<<<< HEAD
const URL_API = 'http://localhost:8080/api/v1';
=======
const URL_API = 'https://book-store-9po5.onrender.com
/api/v1';
// const URL_API = 'http://localhost:8080/api/v1';
>>>>>>> b2281e0a35487db1fd0b50a7a0d7988f7fbea02a

// Api BOOK
const API_BOOK = "book";
const API_BOOK_CATEGORY = 'category/book';
const API_BOOK_COMMENT = 'comment/book';
const API_BOOK_GENRES = 'bookGenre';
const API_BOOK_SEARCH = "search/book";
const API_BOOK_AUTHOR = "author/book";


// VERTIFY
const  URL_VERTIFY = "auth/verify";
const  URL_RESENDVERIFI = "auth/resendVerifi"
// AUTH
const URL_AUTH_REGISTER ="auth/register"
// USER
const URL_USER ="user"
const URL_ALL_USER = 'admin/users'
const URL_API_DETAIL_USER = 'user/detail/user'
// CHECKOUT
const URL_API_CHECKOUT = 'user/book/checkout';
export {
    URL_API,
    API_BOOK,
    API_BOOK_CATEGORY,
    API_BOOK_COMMENT,
    API_BOOK_GENRES,
    URL_VERTIFY,
    URL_RESENDVERIFI,
    URL_AUTH_REGISTER,
    URL_USER,
    API_BOOK_SEARCH, 
    URL_ALL_USER,
    URL_API_DETAIL_USER,
    URL_API_CHECKOUT,
    API_BOOK_AUTHOR
}
