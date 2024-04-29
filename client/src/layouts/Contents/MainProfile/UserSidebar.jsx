import { useContext } from "react";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { MdAdminPanelSettings } from "react-icons/md";
import { DataUser } from "../../../contexts/authContext/DataUserLogin";
import { AvatarUser } from "~/components/image/AvatarDefault";
import { IconSoi, IconLa } from "~/public/icon-page/icon";
import { Uicontext } from "~/contexts/UiContext";

const UserSidebar = () => {
    const {displayUserSidebar,handleHideUserSidebar} = useContext(Uicontext)
    const { userEmail, isAdmin } = useContext(DataUser);
    return (
        <>
            <div className={`w-[25%] border-r border-[#1E1E20] pr-5 max-lg:fixed max-lg:bg-[#000000] max-lg:h-dvh max-lg:top-[70px] max-lg:w-[400px] max-lg:z-20 max-lg:left-0  pl-5 max-lg:ease-in max-lg:duration-300 max-lg:pt-[50px] max-lg:${displayUserSidebar} `}>
            <div className="pb-4 text-[25px] hidden max-lg:block ]">
            <FiArrowLeft className="text-[#fff] cursor-pointer" onClick={()=>handleHideUserSidebar()}/>
            </div>
                <div className="flex items-center justify-between gap-5">
                    <span className="text-white">{userEmail ? userEmail : "Đang tải..."}</span>
                    <img className="w-[50px] rounded-full cursor-pointer" src={AvatarUser} alt="" />
                </div>
                <div className="flex gap-3 items-center">
                    <div className="flex items-center gap-1">
                        <img src={IconSoi} alt="Sồi" />
                        <span className="text-yellow-500">0</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <img src={IconLa} alt="Lá" />
                        <span className="text-[#61b42d]">0</span>
                    </div>
                </div>
                <div className="mt-2 flex gap-2 border-b border-[#2b2b2e]  pb-5">
                    <button className="w-[40%] bg-[#139F7B] text-white  p-2 rounded-[50px] ">Nạp sồi</button>
                    <button className="bg-[#139F7B] text-white w-full p-2 rounded-[50px] ">Trờ thành hội viên</button>
                </div>
                <div className="mt-2 px-2 flex items-center cursor-pointer hover:bg-[#383635] rounded-md">
                    {isAdmin && (<>
                        <MdAdminPanelSettings className="text-[#bbbbbb] text-[25px]" />
                        <Link className=" text-white w-full p-2 rounded-[50px]" to={'/Dashboard'}>Admin</Link>
                    </>
                    )}
                </div>

                <div className="mt-2 px-2 flex gap-2 p-2 items-center cursor-pointer hover:bg-[#383635] rounded-md bg-[#2A2A2C]">
                    <FaRegUser className="text-[#16ab84] text-[20px]" />
                    <Link className=" text-[#16ab84] w-full  rounded-[50px]" to={'/account/profile'}>Quản lí tài khoản</Link>
                </div>

                {!isAdmin && (
                    <Link to={'/book/checkout'}>
                        <div className="mt-2 px-2 flex items-center cursor-pointer hover:bg-[#383635] rounded-md">
                            <MdOutlineShoppingCartCheckout className="text-[#fff] text-[20px]" />
                            <span className=" text-white w-full p-2 rounded-[50px] ">Đơn hàng</span>
                        </div>
                    </Link>
                )}

                <div className="mt-2 px-2 flex items-center cursor-pointer hover:bg-[#383635] rounded-md">
                    <img src="https://waka.vn/svgs/icon-list.svg" alt="" />
                    <span className=" text-white w-full p-2 rounded-[50px] ">Tủ sách cá nhân</span>
                </div>
                <div className="mt-2 px-2 flex items-center cursor-pointer hover:bg-[#383635] rounded-md">
                    <img src="https://waka.vn/svgs/icon-medal.svg" alt="" />
                    <span className=" text-white w-full p-2 rounded-[50px] ">Thứ hạng đọc sách</span>
                </div>
                <div className="mt-2 px-2 flex items-center cursor-pointer hover:bg-[#383635] rounded-md">
                    <img src="https://waka.vn/svgs/icon-package-plan.svg" alt="" />
                    <span className=" text-white w-full p-2 rounded-[50px] ">Lịch sử giao dịch</span>
                </div>
                <div className="mt-2 px-2 flex items-center cursor-pointer hover:bg-[#383635] rounded-md">
                    <img src="https://waka.vn/svgs/icon-help.svg" alt="" />
                    <span className=" text-white w-full p-2 rounded-[50px] ">Hổ trợ khách hàng</span>
                </div>

            </div>
        </>
    );
};

export default UserSidebar;