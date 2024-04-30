import { useContext, useEffect, useState } from "react";
import SettingSecurity from "./SettingSecurity";
import SettingUser from "./SettingUser";
import MyOrder from "./myOrder";
import { GetDataUserCheckout } from "../../../services/checkout/checkoutUserService";
import { DataUser } from "../../../contexts/authContext/DataUserLogin";
import { FiAlignLeft } from "react-icons/fi";
import { Uicontext } from "~/contexts/UiContext";

const SettingProfile = () => {
    const [tabContent, setTabContent] = useState(1);
    const [activeTab, setActiveTab] = useState(1);
    const [dataUserCheckout, setDataUserCheckout] = useState(null);
    const { inforUser } = useContext(DataUser);
    const {handleDisplayUserSidebar} = useContext(Uicontext)
    
    const handleTabContent = (index) => {
        setTabContent(index);
        setActiveTab(index);
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
            <div className="p-5 w-[85%] max-lg:w-full max-lg:p-0">
               <div>
               <FiAlignLeft 
               className="text-[#fff] text-[30px] cursor-pointer hidden max-lg:block"
                onClick={()=>handleDisplayUserSidebar()}
               />
               </div>
                <h1 className="text-[#fff] text-[25px] font-semibold">Quản lí thông tin</h1>
                <div className="flex py-3 items-center gap-5 border-b border-[#3e3e3e] ">
                    <h2 className={`text-[#fff] cursor-pointer  max-md:text-[14px]  ${activeTab === 1 ? 'text-green-600 text-[19px] font-semibold max-md:text-[17px]  ' : ''}`} onClick={() => handleTabContent(1)}>Thông tin cá nhân</h2>

                    <h2 className={`text-[#fff] cursor-pointer max-md:text-[14px] ${activeTab === 2 ? 'text-green-600 text-[19px] font-semibold max-md:text-[17px]' : ''}`}  onClick={() => handleTabContent(2)}>Tài khoản bảo mật</h2>

                    <h2 className={`text-[#fff] cursor-pointer relative max-md:text-[14px] ${activeTab === 3 ? 'text-green-600 text-[19px] font-semibold max-md:text-[17px]' : ''}`}   onClick={() => handleTabContent(3)}>
                        Đơn hàng của bạn
                        {dataUserCheckout !== null && (
                           <div className="absolute right-[0px] top-[-15px]">
                           <span className=" text-[13px] text-[#fff] bg-red-500 w-[20px] flex justify-center items-center rounded-full ">  {dataUserCheckout !== null && dataUserCheckout.length}</span>
                           </div>
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
