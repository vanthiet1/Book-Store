import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useContext, useState, useEffect } from "react";
import Search from "@components/search/Search";
import ListMenuUser from "@components/menuUser/ListMenuUser";
import { Uicontext } from "../contexts/UiContext";
import { DataUser } from "../contexts/authContext/DataUserLogin";
import { UseCart } from "../contexts/CartContext";
import { handleScrollToTop } from "~/components/animations/scroll/ScrollTop";
const Header = () => {
    const { handleDisplayLogin, handleDisplayRegister } = useContext(Uicontext);
    const { handleDisplayCart } = useContext(Uicontext);
    const { isAdmin } = useContext(DataUser);
    const [isUserLogin, setIsUserLogin] = useState(true);
    const [showResultSearch, setShowResultSearch] = useState(false)
    const [stateBgHeader, setStateBgHeader] = useState(null);
    const [searchResults, setSearchResults] = useState([]);
    const { cart } = UseCart();
  
    useEffect(()=>{
        const getToken =  localStorage.getItem('token');   
         setIsUserLogin(getToken)
    },[])

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
        window.location.assign('/')
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
             items-center justify-between p-3 opacity-[0.9] flex fixed w-full z-[2] 
            `}>
                <div className="flex items-center gap-4 ">
                    <div className="px-5" onClick={handleScrollToTop}>
                        <Link to={'/'}>
                            <h1 className="text-green-200 text-[35px] font-bold">Sách</h1>
                        </Link>
                    </div>
                    <ul className="flex gap-2">
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
                            <Link to={`/book/`}>Sách hay</Link>
                        </li>
                        <li className="text-white font-bold px-2 cursor-pointer" >
                            <Link to={`/book/retail`}>Mua lẻ</Link>
                        </li>
                    </ul>
                </div>
                <div className="flex items-center gap-5 px-1">
                    <div className="cursor-pointer flex items-center relative">
                        <Search updateResults={updateSearchResults} />
                        {showResultSearch && searchResults.length > 0 && (
                            <div className="absolute w-[470px] h-dvh bg-black top-[45px] right-[-165px] rounded-md  overflow-auto scrollbar-thin">
                                {searchResults && searchResults.map((productSeach, index) => (
                                    <Link key={index} to={{ pathname: `/ebook/${productSeach._id}`, state: { fromSearch: true } }}>
                                        <div onClick={handleScrollToTop} className="flex gap-4 hover:bg-[#1d5353] p-5 rounded-md duration-300 ease-in">
                                            <div className="relative">
                                                <img className="w-[120px] rounded-md" src={productSeach.imgBook} alt="" />
                                                <div className="absolute bottom-0 left-0 bg-[#26D99A] w-full rounded-t-md">
                                                    <span className=" block text-[#fff] text-center ">{productSeach.labelBook}</span>
                                                </div>
                                            </div>
                                            <div>
                                                <h1 className="text-[#fff] font-semibold text-[20px]">{productSeach.nameBook}</h1>
                                                <span className="text-[#fff] block py-2">{productSeach.genres[0].name}</span>
                                                <span className="text-[#fff] block">{productSeach.author[0].name}</span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="relative">
                        <FaShoppingCart onClick={handleDisplayCart} className="text-[20px] text-[#fff] cursor-pointer" />
                        <div className={`absolute top-[-15px] right-[-10px] ${cart.length === 0 ? "hidden" : "bg-red-500"}  w-[20px] h-[20px]
                        flex justify-center items-center rounded-[50%]`}>
                            <span className="text-[#fff]">{cart.length}</span>
                        </div>
                    </div>
                    <div className="flex gap-2 items-center">
                        { isUserLogin && isUserLogin ? (
                            <>
                                <ListMenuUser LogoutUser={handleLogout} />
                            </>
                        ) : (
                            <>
                                <button className="text-white font-bold bg-[#C7C7C8] p-[6px] rounded-full border-[1px] border-gray-300 bg-transparent bg-opacity-50 w-[100px]" onClick={handleDisplayRegister}>Đăng ký</button>
                                <button className="text-white font-bold bg-[#139F7B] p-[5px] rounded-full w-[110px]" onClick={handleDisplayLogin}>Đăng nhập</button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Header;