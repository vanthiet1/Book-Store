import { useContext } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { Uicontext } from "~/contexts/UiContext";
import { UseCart } from "~/contexts/CartContext";
const CartItems = () => {
    const { handleDisplayCart } = useContext(Uicontext);
    const { cart } = UseCart();
    return (
        <>
            <div className="relative">
                <FaShoppingCart onClick={handleDisplayCart} className="text-[20px] text-[#fff] cursor-pointer" />
                <div className={`absolute top-[-15px] right-[-10px] ${cart.length === 0 ? "hidden" : "bg-red-500"}  w-[20px] h-[20px]
                        flex justify-center items-center rounded-[50%]`}>
                    <span className="text-[#fff]">{cart.length}</span>
                </div>
            </div>
        </>
    );
};

export default CartItems;