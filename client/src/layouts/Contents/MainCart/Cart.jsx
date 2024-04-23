import { useContext, useEffect, useState } from "react";
import { CiCircleRemove } from "react-icons/ci";
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
        } else if (inforUser && inforUser.status === true ) {
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
            <div className="w-[500px] bg-[#0d3434] h-screen px-5 py-2 rounded-l-md fixed right-0 z-40">
                <div className="flex cursor-pointer">
                    <CiCircleRemove onClick={() => handleHideCart()} className="text-[30px] text-[#fff]" />
                </div>

                <div className="h-[600px] overflow-auto scrollbar-thin" >
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
                                            <button  aria-label="Giảm"  className="text-[#fff] w-[50px] font-bold  bg-transparent" onClick={() => handleDecreaseQuantity(index)}>-</button>
                                            <input
                                                type="number"
                                                className="w-[70px] pl-4  bg-transparent text-[#fff] text-[20px]"
                                                value={productCart.quantity}
                                                onChange={(e) => handleQuantityChange(index, parseInt(e.target.value))}
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
                            <img src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-4816550-4004141.png" alt="" />
                        </>
                    )}

                </div>

                <div className="pl-3 flex items-center gap-2">
                    <h1 className="text-[#fff] ">Tổng tiền:</h1>
                    <span className="text-[#f91717] font-semibold text-[20px]">{totalPrice ? totalPrice.toLocaleString() + " VND" : <BeatLoader color="#36d7b7" />}</span>
                </div>

                <div className="absolute bottom-[-5px] w-full p-2">
                    <button  aria-label="Thanh toán" onClick={handleCheckout} className="text-[#fff] w-[95%] bg-[#f94d17] rounded-lg p-3">
                        Đến Thanh Toán
                    </button>
                </div>
            </div>
        </>
    );
};

export default Cart;
