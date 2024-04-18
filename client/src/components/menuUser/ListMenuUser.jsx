import { useContext } from "react";
import { Link } from 'react-router-dom'
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import { MdAdminPanelSettings } from "react-icons/md";
import { avatarDefault } from "../image/avatarDefault";
import { DataUser } from "../../contexts/authContext/DataUserLogin";

const ListMenuUser = (props) => {
    const { LogoutUser } = props;
    const { userEmail , inforUser  , isAdmin} = useContext(DataUser);
    return (
        <>
            <div className="relative group">
                <div className="flex items-center gap-5">
                    <img src="https://waka.vn/svgs/icon-notification.svg" alt="" />
                    <img className="w-[50px] rounded-full cursor-pointer " src={avatarDefault } alt="" />
                </div>
                <div className=" bg-[#1a1a1c] w-[300px] h-[0]  rounded-[10px]  blur-[0.5px]  backdrop-filter backdrop-blur-xl backdrop-saturate-150 backdrop-grayscale-50 absolute left-[-200px] top-[50px]  group-hover:h-[500px] overflow-hidden px-3 ease-in duration-300  ">
                    <div className="flex items-center justify-between">
                        <img className="w-[50px] rounded-full cursor-pointer" src={ avatarDefault} alt="" />
                        <span className="text-white">{userEmail ? userEmail : "Đang tải"}</span>
                    </div>
                    <div className="mt-2">
                        <button className="bg-[#139F7B] text-white w-full p-2 rounded-[50px] ">Trờ thành hội viên</button>
                    </div>
                    <div className="mt-2 px-2 flex items-center cursor-pointer hover:bg-[#383635] rounded-md">
                        {isAdmin && (<>
                            <MdAdminPanelSettings  className="text-[#bbbbbb] text-[25px]"  />
                            <Link className=" text-white w-full p-2 rounded-[50px]" to={'/Dashboard'}>Admin</Link>
                        </>)}
                    </div>
                    <div className="mt-2 px-2 flex items-center cursor-pointer hover:bg-[#383635] rounded-md">
                        <img src="https://waka.vn/svgs/icon-account.svg" alt="" />
                        {inforUser &&  (
                            <>
                            <Link className=" text-white w-full p-2 rounded-[50px]" to={'/account/profile'}>Quản lí tài khoản</Link>
                        </>)}

                    </div>
                  

                    <Link to={'/book/checkout'}>
                        <div className="mt-2 px-2 flex items-center cursor-pointer hover:bg-[#383635] rounded-md">
                            <MdOutlineShoppingCartCheckout className="text-[#fff] text-[20px]" />
                            <span className=" text-white w-full p-2 rounded-[50px] ">Đơn hàng</span>
                        </div>
                    </Link>
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
                    <div className="flex justify-center mt-3">
                        <span className="text-white font-bold cursor-pointer" onClick={LogoutUser}>Đăng Xuất</span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ListMenuUser;