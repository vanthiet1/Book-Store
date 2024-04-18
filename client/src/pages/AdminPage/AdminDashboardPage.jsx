import { useEffect } from "react";
import { useLocation } from 'react-router-dom';
import Navbar from "./Layout/Navbar";
import Sidebar from "./Layout/Sidebar";

import Dashboard from './content/Dashboard';
import Product from './content/Product'
import User from './content/User.jsx'
import Category from "./content/Category.jsx";
import Genres from "./content/Genres.jsx";
import Comment from "./content/Comment.jsx";
import Checkout from './content/Checkout.jsx';
import Author from "./content/Author.jsx";

import PathAdmin from "../../config/PathAdmin";

const AdminDashboardPage = () => {
    const location = useLocation();
    useEffect(() => {
        document.title = "Admin"
    }, [])
    return (
        <>
            <div className=" flex p-2 bg-[#F9FAFB]">
                <div className="bg-[#1F2937] w-[15%] h-[720px] p-[10px] rounded-lg">
                    <Sidebar/>
                </div>
                <div className=" w-[85%] px-4">
                    <Navbar/>
                    <div className="pt-4">
                        {location.pathname === PathAdmin.Dashboard && (<Dashboard />)}
                        {location.pathname === PathAdmin.Product && (<Product />)}
                        {location.pathname === PathAdmin.User && (<User />)}
                        {location.pathname === PathAdmin.Category && (<Category />)}
                        {location.pathname === PathAdmin.Genres && (<Genres />)}
                        {location.pathname === PathAdmin.Comment && (<Comment />)}
                        {location.pathname === PathAdmin.Checkout && (<Checkout />)}
                        {location.pathname === PathAdmin.Author && (<Author />)}

                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminDashboardPage;