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
import ProductCheckout from "~/layouts/Contents/MainCheckout/ProductCheckout";
import { Uicontext } from "~/contexts/UiContext";
const Checkout = () => {



    const { inforUser } = useContext(DataUser);
    const  {handleDisplayVertify} = useContext(Uicontext)
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
            if (inforUser.status === false) {
                setErrorStatusUser(true)
                setTimeout(() => {
                    navigate('/account/profile')
                    handleDisplayVertify()

                }, 1000)
                return;
            }
            if (detailUser === undefined) {
                setErrorEmpetyInfor(true);
                setTimeout(() => {
                    navigate('/account/profile');
                }, 500);
                return;
            }
            if (nameMethodPayment === "QR Code") {
                window.location.href = `https://api.vietqr.io/image/970422-9213112004-46Pz0lW.jpg?accountName=NGUYEN%20VAN%20THIET&addInfo=${inforUser.email} ${totalPriceCheckout} VND`
            }
            if (nameMethodPayment === "Ví điện tử") {
                console.log('lo');
            }
            const data = {
                userId: inforUser._id,
                products: cart,
                phoneNumber: detailUser.phoneNumber,
                address: detailUser.address,
                totalPrice: totalPriceCheckout,
                methodPayment: nameMethodPayment,
                status: "chờ"
            };
            await PostCheckoutUser(data)
            setSuccsessCheckout(true);
            setTimeout(() => {
                navigate('/')
            }, 40000);
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
            {errorStatusUser && <Error message={"Chưa xác thực tài khoản"} />}
            <TitleSetter title="Thanh  toán  " />
            <div className="w-full h-full">
                <Header />
                <div className="pt-[150px] bg-[#191821] p-5 w-full h-auto max-lg:pt-[100px]">
                    <h1 className="text-[#fff] text-[50px] font-bold max-lg:text-[30px] max-md:text-[20px]">Chọn hình thức thanh toán</h1>
                    <span className="text-[#fff] font-semibold text-[20px] max-lg:text-[16px] max-md:text-[14px]">An toàn - Nhanh chóng - Bảo mật</span>
                    {inforUser && inforUser === null ? (
                        <div className="pt-2">
                            <NotFoundPage />
                        </div>
                    ) : (
                        <div className="flex justify-between mt-4 max-lg:flex-col max-lg:gap-3">
                            <div className="w-1/2 max-lg:w-full">
                                <MethodPayment ClickoptionQrCode={handleAtiveOptionPayment} borderActive={activeOption} />
                            </div>
                            <div className="border p-5 rounded-md border-gray-500">
                                <ProductCheckout
                                    productCheckout={productCheckout}
                                    nameMethodPayment={nameMethodPayment}
                                    totalPriceCheckout={totalPriceCheckout}
                                    handleCheckUserCheckout={handleCheckUserCheckout}
                                    activeCheckout={activeCheckout}
                                />
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