import PathUser from "../config/PathUser";
import Home from "../pages/UserPage/Home";
import BookDetail from "../pages/UserPage/BookDetail";
import BookTrendingPage from "../pages/UserPage/BookNewPage";
import BookFreePage from "../pages/UserPage/BookFreePage";
import BookNewPage from "../pages/UserPage/BookNewPage";
import ProfilePage from "../pages/UserPage/ProfilePage";
import Checkout from "../pages/UserPage/Checkout";

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
        path: PathUser.BookTrendingPage,
        component: BookTrendingPage,
        title: 'BookTrending',
    },
    {
        path: PathUser.BookFreePage,
        component: BookFreePage,
        title: 'BookFree',
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
   
]
export default publicRouterUser