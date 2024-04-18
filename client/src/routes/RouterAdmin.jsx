import { useContext, useEffect } from "react";
import { DataUser } from "../contexts/authContext/DataUserLogin";
import AdminDashboardPage from "../pages/AdminPage/AdminDashboardPage";
import NotFoundPage from "../components/404-error/NotFoundPage.jsx";
import PathAdmin from "../config/PathAdmin";


const PublicRouterAdmin = () => {
    const { isAdmin } = useContext(DataUser);

    useEffect(() => {
       const checkAdmin = ()=>{
        if (isAdmin !== null) {
            const encodedAdmin = btoa(isAdmin.toString());
            localStorage.setItem('#', encodedAdmin);
        }
       }
       checkAdmin()
    }, [isAdmin]);

    const isAdminFromLocalStorage = localStorage.getItem('#') ? atob(localStorage.getItem('#')) === 'true' : false;
    const routes = [
        {
            path: PathAdmin.Dashboard,
            component: isAdminFromLocalStorage ? AdminDashboardPage : NotFoundPage,
            title: 'AdminDashboardPage',
        },
        {
            path: PathAdmin.Product,
            component: isAdminFromLocalStorage ? AdminDashboardPage : NotFoundPage,
            title: 'ProductDashboardPage',
        },
        {
            path: PathAdmin.User,
            component: isAdminFromLocalStorage ? AdminDashboardPage : NotFoundPage,
            title: 'UserDashboardPage',
        },
        {
            path: PathAdmin.Category,
            component: isAdminFromLocalStorage ? AdminDashboardPage : NotFoundPage,
            title: 'CategoryDashboardPage',
        },
        {
            path: PathAdmin.Genres,
            component: isAdminFromLocalStorage ? AdminDashboardPage : NotFoundPage,
            title: 'GenresDashboardPage',
        },
        {
            path: PathAdmin.Comment,
            component: isAdminFromLocalStorage ? AdminDashboardPage : NotFoundPage,
            title: 'CommentDashboardPage',
        },
        {
            path: PathAdmin.Checkout,
            component: isAdminFromLocalStorage ? AdminDashboardPage : NotFoundPage,
            title: 'CheckoutDashboardPage',
        },
        {
            path: PathAdmin.Author,
            component: isAdminFromLocalStorage ? AdminDashboardPage : NotFoundPage,
            title: 'AuthorDashboardPage',
        }
    ];

    return routes;
};

export default PublicRouterAdmin;