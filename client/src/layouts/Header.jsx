import { Link, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { PiUserCircleGearBold } from "react-icons/pi";
import Search from "@components/search/Search";
import ListMenuUser from "@components/menuUser/ListMenuUser";
import { Uicontext } from "../contexts/UiContext";
import { DataUser } from "../contexts/authContext/DataUserLogin";
import { handleScrollToTop } from "~/components/animations/scroll/ScrollTop";
import ResultSearch from "~/components/search/ResultSearch";
import CartItems from "~/components/cart/CartItems";
import { IoCloseSharp } from "react-icons/io5";
const Header = () => {
    const { handleDisplayLogin, handleDisplayRegister } = useContext(Uicontext);
    const { isAdmin } = useContext(DataUser);
    const [isUserLogin, setIsUserLogin] = useState(true);
    const [showResultSearch, setShowResultSearch] = useState(false)
    const [stateBgHeader, setStateBgHeader] = useState(null);
    const [searchResults, setSearchResults] = useState([]);
    const [useHiddenButton, setUseHiddenButton] = useState('hidden');
    const [useHiddenClose, setUseHiddenClose] = useState('block');
    const [useDisplayButton, setUseDisplayButton,] = useState('block');


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

    const HiddenButton = ()=>{
        setUseHiddenButton('block')
        setUseHiddenClose('block');
        setUseDisplayButton('hidden');
    }
    return (
        <>
            <div className={` ${stateBgHeader}
             items-center justify-between p-3 flex fixed w-full z-20
            left-0 top-[-5px] max-md:pt-3 max-md:p-2 max-md:gap-2`}>
                <div className="flex items-center gap-4 ">
                    <div className="px-5 max-md:px-1" onClick={handleScrollToTop}>
                        <Link to={'/'}>
                            <h1 className="text-green-200 text-[35px] font-bold max-md:text-[20px] ">Sách</h1>
                        </Link>
                    </div>
                    <ul className="flex gap-2 max-lg:fixed max-lg:left-0 max-lg:bottom-[-5px] max-lg:bg-[#1f1f1f] max-lg:p-5 max-lg:w-[100%] max-lg:justify-between max-md:p-2 items-center">
                        <li className="text-white font-bold px-2 cursor-pointer max-md:text-[13px] max-md:py-3 max-md:px-0" >
                            <Link to={`/book/free`} className=" max-md:w-max">Sách miễn phí</Link>
                        </li>
                        <li className="text-white font-bold px-2 cursor-pointer max-md:text-[13px] max-md:px-0" >
                            <Link to={`/book/new`}>Sách mới nhất</Link>
                        </li>
                        <li className="text-white font-bold px-2 cursor-pointer max-md:text-[13px] max-md:px-0" >
                            <Link to={`/book/suggest`}>Waka đề xuất</Link>
                        </li>
                        <li className="text-white font-bold px-2 cursor-pointer max-md:text-[13px] max-md:px-0" >
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
                                <div className="relative ">
                                    <div className="flex items-center">
                                    <PiUserCircleGearBold
                                        onClick={()=>HiddenButton()}
                                        className={`text-[#fff] text-[30px] cursor-pointer hidden max-md:${useDisplayButton}`} />

                                        <IoCloseSharp 
                                        onClick={()=>{
                                            setUseHiddenButton('hidden')
                                            setUseHiddenClose('hidden')
                                            setUseDisplayButton('block')
                                        }}
                                        className={`text-[#fff] cursor-pointer  text-[30px] hidden max-md:${useHiddenClose}`}/>

                                    </div>
                                    <div className={`flex gap-2 max-md:${useHiddenButton} max-md:absolute max-md:w-[200px] max-md:left-[-170px] top-[40px] max-md:flex`}>
                                        <button aria-label="Đăng ký" className="text-white max-md:bg-white max-md:text-[#139f7b] font-bold bg-[#C7C7C8] p-[6px] rounded-full border-[1px] border-gray-300 bg-transparent bg-opacity-50 w-[100px] 
                                        " onClick={handleDisplayRegister}>Đăng ký</button>
                                        <button aria-label="Đăng nhập" className="text-white font-bold bg-[#139F7B] p-[5px] rounded-full w-[110px]" onClick={handleDisplayLogin}>Đăng nhập</button>
                                    </div>
                                </div>

                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Header;