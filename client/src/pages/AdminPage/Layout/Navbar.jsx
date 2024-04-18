import SearchPage from "../components/Search/SearchPage";
import Profile from "../components/profileAdmin/Profile";
import { IoLogOutOutline } from "react-icons/io5";
import { Link } from 'react-router-dom'
const Navbar = () => {
    return (
        <>
            <div className="flex justify-between w-full h-auto py-3 border-b-2">
                <SearchPage></SearchPage>
                <div className="flex items-center gap-2">
                    <Profile></Profile>
                    <Link to={'/'}>
                        <IoLogOutOutline className="text-[25px] cursor-pointer" />
                    </Link>
                </div>
            </div>
        </>
    );
};

export default Navbar;