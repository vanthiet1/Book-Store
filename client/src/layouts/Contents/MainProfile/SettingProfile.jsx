import { useContext, useEffect, useState } from "react";
import SettingSecurity from "./SettingSecurity";
import SettingUser from "./SettingUser";
import MyOrder from "./myOrder";
import { GetDataUserCheckout } from "../../../services/checkout/checkoutUserService";
import { DataUser } from "../../../contexts/authContext/DataUserLogin";

const SettingProfile = () => {
    const [tabContent, setTabContent] = useState(1);
    const [dataUserCheckout, setDataUserCheckout] = useState(null);
    const { inforUser } = useContext(DataUser);
    
    const handleTabContent = (index) => {
        setTabContent(index)
    }

    const handleGetDataCheckout = async () => {
        try {
            const userID = inforUser._id ? inforUser._id : null;
            const response = await GetDataUserCheckout(userID);
            const products = response.reduce((allProducts, checkout) => {
                checkout.products.forEach(product => {
                    allProducts.push(product);
                });
                return allProducts;
            }, []);
            setDataUserCheckout(products);
        } catch (error) {
            console.log(error);
        }
    };


    useEffect(() => {
        handleGetDataCheckout();
    }, [])

    return (
        <>
            <div className="p-5 w-[85%]">
                <h1 className="text-[#fff] text-[25px] font-semibold">Quản lí thông tin</h1>
                <div className="flex py-3 items-center gap-3 border-b border-[#3e3e3e] ">
                    <h2 className="text-[#fff] cursor-pointer" onClick={() => handleTabContent(1)}>Thông tin cá nhân</h2>
                    <h2 onClick={() => handleTabContent(2)} className="text-[#fff] cursor-pointer">Tài khoản bảo mật</h2>
                    <h2 onClick={() => handleTabContent(3)} className="text-[#fff] cursor-pointer relative">
                        Đơn hàng của bạn
                        {dataUserCheckout !== null && (
                            <span className="absolute text-[13px] top-[-15px] text-[#fff] bg-red-500 w-[20px] flex justify-center items-center right-[-20px] rounded-full ">  {dataUserCheckout !== null && dataUserCheckout.length}</span>
                        )}
                    </h2>
                </div>
                <div>
                    {tabContent === 1 && <SettingUser />}
                    {tabContent === 2 && <SettingSecurity />}
                    {tabContent === 3 && <MyOrder />}
                </div>
            </div>
        </>
    );
};

export default SettingProfile;
