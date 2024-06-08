import { useContext, useEffect, useState } from "react";
import { IoCloseCircleSharp } from "react-icons/io5";
import { BeatLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom'
import { MdOutlineRemoveShoppingCart } from "react-icons/md";
import { Uicontext } from "../../../contexts/UiContext";
import { UseCart } from "../../../contexts/CartContext";
import { DataUser } from "../../../contexts/authContext/DataUserLogin";
import Error from "../../../components/notification/Error";
const Cart = () => {
    const navigate = useNavigate();
    const { handleHideCart, handleDisplayLogin } = useContext(Uicontext);
    const [totalPrice, setTotalPrice] = useState(0);
    const { cart, removeFromCart } = UseCart();
    const { inforUser } = useContext(DataUser);
    const [errorStatus, setErrorStatus] = useState(false);
    const [errorNotLogin, setErrorNotLogin] = useState(false);

    const handleCheckout = () => {
        if (inforUser === null) {
            setErrorNotLogin(true)
            handleHideCart()
            handleDisplayLogin()
            return false
        } else if (inforUser && inforUser.status === true) {
            handleHideCart()
            navigate('/book/checkout');
        } else {
            setErrorStatus(true);
            handleHideCart()
            navigate('/account/profile');
            return '';
        }
    };


    useEffect(() => {
        const totalPriceProduct = cart.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0);
        setTotalPrice(totalPriceProduct);
    }, [cart]);

    const handleQuantityChange = (index, newQuantity) => {
        const updatedCart = [...cart];
        updatedCart[index].quantity = parseInt(newQuantity);
        setTotalPrice(updatedCart.reduce((total, item) => total + (item.price * item.quantity), 0));
    };

    const handleDecreaseQuantity = (index) => {
        if (cart[index].quantity > 1) {
            const updatedCart = [...cart];
            updatedCart[index].quantity--;
            setTotalPrice(updatedCart.reduce((total, item) => total + (item.price * item.quantity), 0));
            updateCartAndLocalStorage(updatedCart)
        }
    };

    const handleIncreaseQuantity = (index) => {
        const updatedCart = [...cart];
        updatedCart[index].quantity++;
        setTotalPrice(updatedCart.reduce((total, item) => total + (item.price * item.quantity), 0));
        updateCartAndLocalStorage(updatedCart)
    };

    const updateCartAndLocalStorage = (updatedCart) => {
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    return (
        <>
            {errorStatus && <Error message='Vui lòng xác thực tài khoản' />}
            {errorNotLogin && <Error message='Vui lòng đăng nhập' />}
            <div className="w-[500px] bg-[#0d3434] h-screen px-5 py-2 rounded-l-md fixed right-0 z-40 max-md:w-[350px] max-md:top-[-1px]">
                <div className="flex cursor-pointer py-2">
                    <IoCloseCircleSharp className="text-[30px] text-[#fff] max-md:text-[30px]"  onClick={() => handleHideCart()}  />
                    <div className="w-[500px] ">
                        <h1 className="text-center text-[20px] text-[#fff]">Giỏ hàng</h1>
                    </div>
                </div>

                <div className="h-[550px] max-md:h-[500px] overflow-auto scrollbar-thin" >
                    {cart.length > 0 ? (
                        cart.map((productCart, index) => (
                            <div className="flex gap-2 pt-4" key={index} >
                                <div>
                                    <img className="w-[150px] rounded-md" src={productCart.imgBook} alt="" />
                                </div>
                                <div>
                                    <div>
                                        <h1 className="text-[#fff]">{productCart.name}</h1>
                                        <span className="text-[#fff] inline-block py-2">
                                            {productCart.price ? productCart.price.toLocaleString() + " VND" : ''}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <button aria-label="Giảm" className="text-[#fff] w-[50px] font-bold  bg-transparent" onClick={() => handleDecreaseQuantity(index)}>-</button>
                                            <input
                                                type="number"
                                                className="w-[70px] pl-6 bg-transparent text-[#fff] text-[20px]"
                                                value={productCart.quantity}
                                                onChange={(e) => handleQuantityChange(index, Math.max(1, parseInt(e.target.value)))}
                                            />
                                            <button aria-label="Tăng" className="text-[#fff] w-[50px] font-bold bg-transparent" onClick={() => handleIncreaseQuantity(index)}>+</button>
                                        </div>
                                        <div>
                                            <MdOutlineRemoveShoppingCart onClick={() => removeFromCart(productCart.productId)} className="text-red-600 text-[20px] cursor-pointer" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <>
                            <div>
                                <img className="w-[100%]" src="https://res.cloudinary.com/dz93cdipw/image/upload/v1713867628/Book-Store/Icon/sdppmb00q7fcyi6ftom0.webp" alt="empety-cart" />
                            </div>
                        </>
                    )}

                </div>

                <div className="pl-3 flex items-center gap-2">
                    <h1 className="text-[#fff] ">Tổng tiền:</h1>
                    <span className="text-[#f91717] font-semibold text-[20px]">{totalPrice ? totalPrice.toLocaleString() + " VND" : <BeatLoader color="#36d7b7" />}</span>
                </div>

                <div className="w-full p-2">
                    <button aria-label="Thanh toán" onClick={handleCheckout} className="text-[#fff] w-[95%] bg-[#f94d17] rounded-lg p-3 max-lg:w-full">
                        Đến Thanh Toán
                    </button>
                </div>
            </div>
        </>
    );
};

export default Cart;
