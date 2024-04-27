import { Link, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import Search from "@components/search/Search";
import ListMenuUser from "@components/menuUser/ListMenuUser";
import { Uicontext } from "../contexts/UiContext";
import { DataUser } from "../contexts/authContext/DataUserLogin";
import { handleScrollToTop } from "~/components/animations/scroll/ScrollTop";
import ResultSearch from "~/components/search/ResultSearch";
import CartItems from "~/components/cart/CartItems";
const Header = () => {
    const { handleDisplayLogin, handleDisplayRegister } = useContext(Uicontext);
    const { isAdmin } = useContext(DataUser);
    const [isUserLogin, setIsUserLogin] = useState(true);
    const [showResultSearch, setShowResultSearch] = useState(false)
    const [stateBgHeader, setStateBgHeader] = useState(null);
    const [searchResults, setSearchResults] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const getToken = localStorage.getItem('token');
        setIsUserLogin(getToken)
    }, [])

    const updateSearchResults = (results) => {
        if (!results) {
            setShowResultSearch(false)
        }
        setSearchResults(results);
        setShowResultSearch(true)
    };

    const handleLogout = () => {
        if (isAdmin) {
            localStorage.removeItem('#');
        }
        localStorage.removeItem('cart');
        localStorage.removeItem('token');

        // window.location.assign('/');
        navigate('/')
        setIsUserLogin(false);
    };

    useEffect(() => {
        const handleScroll = () => {
            const scrolledHeight = window.pageYOffset;
            if (scrolledHeight === 0) {
                setStateBgHeader('bg-transparent  duration-500 ease-in')
            } else {
                setStateBgHeader('bg-[#1f1f1f] duration-500 ease-in')
            }
        };
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return (
        <>
            <div className={` ${stateBgHeader}
             items-center justify-between p-3 flex fixed w-full z-20
            left-0 top-[-5px]`}>
                <div className="flex items-center gap-4 ">
                    <div className="px-5" onClick={handleScrollToTop}>
                        <Link to={'/'}>
                            <h1 className="text-green-200 text-[35px] font-bold">Sách</h1>
                        </Link>
                    </div>
                    <ul className="flex gap-2 max-lg:fixed max-lg:left-0 max-lg:bottom-[-5px] max-lg:bg-[#1f1f1f] max-lg:p-5 max-lg:w-[100%] max-lg:justify-between ">
                        <li className="text-white font-bold px-2 cursor-pointer" >
                            <Link to={`/book/free`}>Sách miễn phí</Link>
                        </li>
                        <li className="text-white font-bold px-2 cursor-pointer" >
                            <Link to={`/book/new`}>Sách mới nhất</Link>
                        </li>
                        <li className="text-white font-bold px-2 cursor-pointer" >
                            <Link to={`/book/suggest`}>Waka đề xuất</Link>
                        </li>
                        <li className="text-white font-bold px-2 cursor-pointer" >
                            <Link to={`/book/retail`}>Mua lẻ</Link>
                        </li>
                    </ul>
                </div>

                <div className="flex items-center gap-5 px-1">
                    <div className="cursor-pointer flex items-center relative">
                        <Search updateResults={updateSearchResults} />
                        {showResultSearch && <ResultSearch searchResults={searchResults} handleScrollToTop={handleScrollToTop} />}
                    </div>
                    <div>
                        <CartItems />
                    </div>
                    <div className="flex gap-2 items-center">
                        {isUserLogin && isUserLogin ? (
                            <>
                                <ListMenuUser LogoutUser={handleLogout} />
                            </>
                        ) : (
                            <>
                                <button aria-label="Đăng ký" className="text-white font-bold bg-[#C7C7C8] p-[6px] rounded-full border-[1px] border-gray-300 bg-transparent bg-opacity-50 w-[100px]" onClick={handleDisplayRegister}>Đăng ký</button>
                                <button aria-label="Đăng nhập" className="text-white font-bold bg-[#139F7B] p-[5px] rounded-full w-[110px]" onClick={handleDisplayLogin}>Đăng nhập</button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Header;