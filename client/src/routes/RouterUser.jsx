import PathUser from "../config/PathUser";
import Home from "../pages/UserPage/Home";
import BookDetail from "../pages/UserPage/BookDetail";
import BookFreePage from "../pages/UserPage/BookFreePage";
import BookNewPage from "../pages/UserPage/BookNewPage";
import BookSuggestPage from "~/pages/UserPage/BookSuggestPage";
import BookRetailPage from "~/pages/UserPage/BookRetailPage";
import ProfilePage from "../pages/UserPage/ProfilePage";
import Checkout from "../pages/UserPage/Checkout";
import ResetPasswordPage from "~/pages/UserPage/ResetPasswordPage";

const publicRouterUser = [
    {
        path: PathUser.Home,
        component: Home,
        title: 'Home',
    },
    {
        path: PathUser.BookDetail,
        component: BookDetail,
        title: 'Ebook',
    },
    {
        path: PathUser.BookNewPage,
        component: BookNewPage,
        title: 'BookNew',
    },
    {
        path: PathUser.BookSuggestPage,
        component: BookSuggestPage,
        title: 'BookSuggest',
    },
    {
        path: PathUser.BookFreePage,
        component: BookFreePage,
        title: 'BookFree',
    },
    {
        path: PathUser.BookRetailPage,
        component: BookRetailPage,
        title: 'BookRetail',
    },
    {
        path: PathUser.BookCheckoutPage,
        component: Checkout,
        title: 'BookCheckout',
    },
    {
        path: PathUser.ProfilePage,
        component: ProfilePage,
        title: 'Profile',
    },
    {
        path: PathUser.ResetPasswordPage,
        component: ResetPasswordPage,
        title: 'ResetPasswordPage',
    },
   
]
export default publicRouterUser