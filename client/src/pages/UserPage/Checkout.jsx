import { useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import Header from "~/layouts/Header";
import Footer from "~/layouts/Footer";
import MethodPayment from "~/layouts/Contents/MainCheckout/MethodPayment";

import NotFoundPage from "@components/404-error/NotFoundPage";
import TitleSetter from "@components/titlePage/TitleSetter";
import Error from "@components/notification/Error";
import Success from "@components/notification/Success";

import { UseCart } from "../../contexts/CartContext";
import { DataUser } from "../../contexts/authContext/DataUserLogin";
import { GetDetailUser } from "../../services/checkout/detailUserService";
import { PostCheckoutUser } from "../../services/checkout/checkoutUserService";

const Checkout = () => {
    const { inforUser } = useContext(DataUser);
    const [productCheckout, setProductCheckout] = useState([]);
    const [detailUser, setDetailUser] = useState([]);
    const [totalPriceCheckout, setTotalPriceCheckout] = useState(0);
    const [activeOption, setActiveOption] = useState(0);
    const [activeCheckout, setActiveCheckout] = useState("");
    const [nameMethodPayment, setNameMethodPayment] = useState("Chưa chọn");
    const [succsessCheckout, setSuccsessCheckout] = useState(false);
    const [errorEmpetyInfor, setErrorEmpetyInfor] = useState(false);
    const [errorStatusUser, setErrorStatusUser] = useState(false);
    const [errorOption, setErrorOption] = useState(false);
    const [errorLogin, setErrorLogin] = useState(false);
    const [errorCartEmpety, setErrorCartEmpety] = useState(false);


    const { cart } = UseCart();
    const navigate = useNavigate();

    const renderProductCheckout = () => {
        setProductCheckout(cart)
    }

    useEffect(() => {
        renderProductCheckout()
    }, [cart])
    useEffect(() => {
        const totalPriceProduct = cart.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0);
        setTotalPriceCheckout(totalPriceProduct);
    }, [cart]);

    const handleAtiveOptionPayment = (option) => {
        setActiveOption(option);
        setNameMethodPayment(option === 1 ? "QR Code" : "Ví điện tử")
        setActiveCheckout('bg-[#15B088]')
    }
    useEffect(() => {
        const DetailUser = async () => {
            try {
                if (!inforUser || !inforUser._id) {
                    return;
                }
                const userId = inforUser._id;
                const inforDetailUser = await GetDetailUser(userId);
                setDetailUser(inforDetailUser);
            } catch (error) {
                console.log(error);
            }
        };
        DetailUser();
    }, [inforUser]);

    const handleCheckUserCheckout = async () => {
        try {
            if (cart.length === 0) {
                setErrorCartEmpety(true);
                setTimeout(() => {
                    navigate('/')
                }, 1000);
                return;
            }
            if (nameMethodPayment === "Chưa chọn") {
                setErrorOption(true)
                return;
            }
            if (inforUser === null) {
                setErrorLogin(true)
                return;
            }
            if(inforUser.status === false){
                setErrorStatusUser(true)
                 setTimeout(()=>{
                    navigate('/account/profile')
                 },1000)
                return;
            }
            if (detailUser === undefined) {
                setErrorEmpetyInfor(true);
                setTimeout(() => {
                    navigate('/account/profile');
                }, 500);
                return;
            }
            
            const data = {
                userId: inforUser._id,
                products: cart,
                phoneNumber: detailUser.phoneNumber,
                address: detailUser.address,
                totalPrice: totalPriceCheckout,
                methodPayment:nameMethodPayment, 
                status:"chờ"
            };
            await PostCheckoutUser(data)
            setSuccsessCheckout(true);
            setTimeout(()=>{
                navigate('/')
            },1000)
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            {errorEmpetyInfor && <Error message={"Vui lòng cập nhật thông tin để thanh toán"} />}
            {errorOption && <Error message={"Vui lòng chọn phương thức thanh toán"} />}
            {errorLogin && <Error message={"Đăng nhập để thanh toán"} />}
            {errorCartEmpety && <Error message={"Vui lòng thêm sản phẩm rồi thanh toán"} />}
            {succsessCheckout && <Success message="Thanh toán thành công" />}
            {errorStatusUser && <Error message={"Chưa xác thực tài khoản"}/>}
            <TitleSetter title="Thanh  toán  " />
            <div className="w-full h-full">
                <Header />
                <div className="pt-[150px] bg-[#191821] p-5 w-full h-auto">
                    <h1 className="text-[#fff] text-[50px] font-bold">Chọn hình thức thanh toán</h1>
                    <span className="text-[#fff] font-semibold text-[20px]">An toàn - Nhanh chóng - Bảo mật</span>
                    {inforUser && inforUser === null ? (
                        <div className="pt-2">
                            <NotFoundPage />
                        </div>
                    ) : (
                        <div className="flex justify-between mt-4">
                            <div className="w-1/2">
                                <MethodPayment ClickoptionQrCode={handleAtiveOptionPayment} borderActive={activeOption} />
                            </div>
                            <div className="border p-5 rounded-md border-gray-500">
                                <h1 className="text-[#fff] font-medium text-[20px]">Thông tin thanh toán</h1>
                                {productCheckout ? (
                                    productCheckout.map((product, index) => (
                                        <div key={index}>
                                            <div className="flex gap-2 py-2 ">
                                                <span className="text-[#B3B3B3] w-[200px]">Sản phẩm {index + 1}</span>
                                                <h1 className="text-[#fff]">{product.name ? product.name : "Sớm có tên"}</h1>
                                            </div>
                                            <div className="flex py-2 items-center gap-2 ">
                                                <span className="text-[#B3B3B3] w-[200px]">Số lượng sản phẩm {index + 1}</span>
                                                <span className="text-[#fff]">{product.quantity ? product.quantity : "Số lượng đang cập nhật"}</span>
                                            </div>
                                            <div className="flex py-2 gap-2">
                                                <span className="text-[#B3B3B3] w-[200px]">Tạm tính</span>
                                                <span className="text-[#fff]">{(product.price * product.quantity).toLocaleString() + " VND"}</span>
                                            </div>
                                        </div>
                                    ))

                                ) : (
                                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ51tXSU5w1aYlxTuaY
xSPc9gaQwSK8x6Equqjaksf60B9pywAfV9IblnwysZMdiUFs0Ww&usqp=CAU" alt="" />
                                )}
                                <div className="flex py-2 gap-2">
                                    <span className="text-[#B3B3B3] w-[200px]">Hình thức thanh toán</span>
                                    <span className="text-[#fff]">{nameMethodPayment}</span>
                                </div>
                                <div className="flex py-2 gap-2">
                                    <span className="text-[#B3B3B3] w-[200px]">Giảm giá</span>
                                    <span className="text-[#fff]">0%</span>
                                </div>
                                <div className="flex py-2 gap-2 ">
                                    <span className="text-[#fff] w-[200px]">TỔNG</span>
                                    <span className="text-green-600">{totalPriceCheckout && totalPriceCheckout.toLocaleString() + " VND"}</span>
                                </div>
                                <div className="mt-2">

                                    <button onClick={handleCheckUserCheckout} className={`  ${activeCheckout ? activeCheckout : ""} text-white p-1 rounded-full w-full py-3 text-[15px] 
                                ease-in duration-200 flex gap-2 items-center justify-center " `}>
                                        <span>Thanh toán</span>
                                    </button>

                                </div>
                            </div>
                        </div>
                    )}


                </div>
                <Footer />

            </div>

        </>
    );
};


export default Checkout;