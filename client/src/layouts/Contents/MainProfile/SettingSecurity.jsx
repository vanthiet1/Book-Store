import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataUser } from "../../../contexts/authContext/DataUserLogin";
import { GetDetailUser } from "~/services/checkout/detailUserService";
import ButtonDefault from "~/components/button-ui/ButtonDefault";
import { Uicontext } from "~/contexts/UiContext";
import Success from "~/components/notification/Success";
import Error from "~/components/notification/Error";
import PolicyDelete from "~/components/deleteAccount/PolicyDelete";
import ButtonConfirmDeleteAccount from "~/components/button-ui/ButtonDeleteAccount";
import { DeleteUser } from "~/pages/AdminPage/service/userService";
const SettingSecurity = () => {
    const [detailUser, setDetailUser] = useState({});
    const { handleDisplayVertifyInlogin } = useContext(Uicontext);
    const { inforUser } = useContext(DataUser);
    const [vertifySuccess, setVertifySuccess] = useState(false);
    const [deleteAccount, setDeleteAccount] = useState(false);
    const [deleteAccountSuccess,setDeleteAccountSuccess] = useState(false);
    const [deleteAccountFaile,setDeleteAccountFaile] = useState(false);
    const Navigate = useNavigate()
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
    useEffect(() => {
        if (inforUser && inforUser._id) {
            DetailUser();
        }
    }, [inforUser]);
    const confirmDeleteAccount = async () => {
        try {
            if (!inforUser || inforUser._id == null) {
                setDeleteAccountFaile(true);
                return;
            }
            await DeleteUser(inforUser._id);
            setDeleteAccountSuccess(true)
             localStorage.removeItem('#');
             localStorage.removeItem('cart')
             localStorage.removeItem('userId')
             localStorage.removeItem('token')
             Navigate('/');
        } catch (error) {
            console.log(error);
        }
    }
    const accountAuthentication = () => {
        if (inforUser.status === true) {
            return setVertifySuccess(true)
        }
        handleDisplayVertifyInlogin()
    }

    return (
        <>
            {vertifySuccess && <Success message={"Tài khoản của bạn đã được xác nhận rồi"} />}
            {deleteAccountSuccess && <Success message={"Tài khoản của bạn đã xóa"}/>}
           {deleteAccountFaile && <Error message={"Bạn có chắc là có tài khoản chưa"}/>} 

            {deleteAccount ? (
                <>
                    <PolicyDelete />
                    <div className="pt-3 flex">
                        <ButtonDefault bgBtn={"bg-[#414143]"} content={"Hủy bỏ"} onClick={() => { setDeleteAccount(false) }} />
                        <ButtonDefault
                        />
                        <ButtonConfirmDeleteAccount
                            clickDelete={() => confirmDeleteAccount()}
                            bgBtn={"bg-[#15B088]"}
                            content={"Xác nhận xóa"}
                        />
                    </div>
                </>
            ) : (
                <>
                    <div className="w-1/2 max-lg:w-full">
                        <div className="bg-[#2A2A2C] rounded-[15px] border border-[#515151] pl-3 py-2 mb-1 mt-3">
                            <span className="text-[#B3B3B3] block">Email</span>
                            <span className="text-[#fff] block">{inforUser ? inforUser.email : "Chưa đăng nhập"}</span>
                        </div>
                        <div className="pl-1">
                            {inforUser && inforUser.status === true ? (<span className="text-green-600 text-[14px] font-semibold">Đã xác thực</span>) : (<span className="text-[#FA573E] text-[14px] font-semibold">Chưa xác thực Email</span>)}
                        </div>

                        <div className="bg-[#2A2A2C] rounded-[15px] border border-[#515151] pl-3 py-2 mb-1 mt-3">
                            <span className="text-[#B3B3B3] block">Số điện thoại</span>
                            <span className="text-[#fff] block">{detailUser && detailUser.phoneNumber ? detailUser.phoneNumber : "Chưa cật nhật số điện thoại"}</span>
                        </div>
                        <div className="mt-5">
                            <ButtonDefault
                                onClick={accountAuthentication}
                                bgBtn={"bg-[#139F7B]"} content="Xác Thực" />
                        </div>
                        <div className="flex gap-1 mt-3 max-md:flex-col">
                            <h3 className="text-[#fff]">Bạn không có nhu cầu sử dụng tài khoản này nữa ?</h3>
                            <span className="text-[#14B088] cursor-pointer" onClick={() => { setDeleteAccount(true) }}>Xóa tài khoản</span>
                        </div>
                    </div>
                </>
            )}

        </>
    );
};

export default SettingSecurity;