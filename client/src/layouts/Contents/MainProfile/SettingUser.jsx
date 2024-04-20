import { useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import ButtonDefault from "../../../components/button-ui/ButtonDefault";
import { DataUser } from "../../../contexts/authContext/DataUserLogin";
import { PostDetailUser, UpdateDetailUser } from "../../../services/checkout/detailUserService";
import { GetDetailUser } from "../../../services/checkout/detailUserService";
import Error from "@components/notification/Error";
import Success from "@components/notification/Success";


const SettingUser = () => {
    const { inforUser } = useContext(DataUser);
    const [addressUser, setAddressUser] = useState("");
    const [phoneNumber, setPhoneNumberUser] = useState("");
    const [detailUser, setDetailUser] = useState(null);
    const [error, setError] = useState(false);
    const [errorLogin, setErrorLogin] = useState(false);
    const [addressError, setAddressError] = useState(false);
    const [phoneError, setPhoneError] = useState(false);
    const [phoneRegexError, setPhoneRegexError] = useState(false);
    const [successPost, setSuccessPost] = useState(false);
    const [successUpdate, setSuccessUpdate] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setAddressUser(inforUser ? (detailUser && detailUser.address) : "Chưa cập nhật");
        setPhoneNumberUser(inforUser ? (detailUser && detailUser.phoneNumber) : "Chưa cập nhật");
    }, [inforUser, detailUser]);

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
    const handlePostInforUser = async () => {
        try {
            setError(false);
            setAddressError(false);
            setPhoneError(false);

            if (detailUser === null) {
                setError(true);
                return;
            }

            if (!addressUser) {
                setAddressError(true);
                return;
            }

            if (!phoneNumber) {
                setPhoneError(true);
                return;
            }
            
            const phoneRegex = /^[0-9]{10}$/;
            if (!phoneRegex.test(phoneNumber)) {
                setPhoneRegexError(true);
                return;
            }


            const data = {
                userId: inforUser._id ? inforUser._id : null,
                phoneNumber: phoneNumber,
                address: addressUser
            };
            await PostDetailUser(data);
            setSuccessPost(true)
            setTimeout(() => {
                navigate('/book/checkout')
            }, 1000)
        } catch (error) {
            console.log("Đã xảy ra lỗi khi cập nhật thông tin người dùng:", error);
        }
    };
    const handleUpdateDetailUser = async () => {
        try {
            if (inforUser === null) {
                setErrorLogin(true)
                return;
            }
            const phoneRegex = /^[0-9]{10}$/;
            if (!phoneRegex.test(phoneNumber)) {
                setPhoneRegexError(true);
                return;
            }

            const userId = inforUser?._id || null;
            const data = {
                phoneNumber: phoneNumber,
                address: addressUser
            };
            await UpdateDetailUser(userId, data);
            setSuccessUpdate(true);
        } catch (error) {
            console.log(error);
        }
    }
    const handleSubmitUser = async () => {
        try {
            if (detailUser === undefined) {
                await handlePostInforUser();
                DetailUser()
            } else {
                await handleUpdateDetailUser()
                DetailUser()
                navigate('/account/profile')
            }
        } catch (error) {
            console.log(error);
        }
    }
    const handleCancelValue = () => {
        if (detailUser) {
            return;
        }
        setAddressUser("");
        setPhoneNumberUser("");
    }


    useEffect(() => {
        DetailUser();
    }, [inforUser]);

    useEffect(() => {
        if (successUpdate) {
            setTimeout(() => {
                setSuccessUpdate(false);
            }, 3000);
        }else if(phoneRegexError){
            setTimeout(() => {
                setPhoneRegexError(false);
            }, 3000);
        }
    }, [successUpdate,phoneRegexError]);

    return (
        <> 
        {phoneRegexError && <Error message="Số điện thoại không hợp lệ" />} 
            {error && <Error message="Vui lòng đăng nhập để cập nhật thông tin" />}
            {errorLogin && <Error message="Vui lòng đăng nhập để cập nhật thông tin" />}
            {successPost && <Success message="Thêm thông tin thành công" />}
            {successUpdate && <Success message="Cập nhật thông tin thành công" />}
            <div className="pt-4">
                <div className="w-1/2">
                    <div className="bg-[#2A2A2C] rounded-[15px] border border-[#515151] pl-3 py-2 mb-5">
                        <span className="text-[#B3B3B3] block">Tên đăng nhập</span>
                        <span className="text-[#fff] block">{inforUser ? inforUser.email : "Chưa đăng nhập"}</span>
                    </div>
                    <div className="bg-[#2A2A2C] rounded-[15px] border border-[#515151] pl-3 py-2 mb-5">
                        <span className="text-[#B3B3B3] block">ID người dùng</span>
                        <span className="text-[#fff] block">{inforUser ? inforUser._id.slice(1, 10) : "Chưa đăng nhập"}</span>
                    </div>
                    <div className="bg-[#2A2A2C] rounded-[15px] border border-[#515151] pl-3 py-2 mb-3">
                        <input
                            placeholder="Cập nhật địa chỉ"
                            className={`w-[95%] bg-transparent outline-none py-2 text-[#fff] ${addressError ? 'border-red-500' : ''}`}
                            type="text"
                            value={addressUser !== null ? addressUser : ""}
                            onChange={(e) => setAddressUser(e.target.value)}
                        />
                        {addressError && <p className="text-red-500 text-sm">Vui lòng nhập địa chỉ</p>}
                    </div>
                    <div className="bg-[#2A2A2C] rounded-[15px] border border-[#515151] pl-3 py-2">
                        <input
                            placeholder="Cập số điện thoại"
                            className={`w-[95%] bg-transparent outline-none py-2 text-[#fff] ${phoneError ? 'border-red-500' : ''}`}
                            type="text"
                            value={phoneNumber !== null ? phoneNumber : ""}
                            onChange={(e) => setPhoneNumberUser(e.target.value)}
                        />
                        {phoneError && <p className="text-red-500 text-sm">Vui lòng nhập số điện thoại</p>}
                    </div>
                    <div className="flex pt-3 gap-3">
                        <ButtonDefault onClick={handleSubmitUser} content="Cập nhật" bgBtn="bg-[#139F7B] " />
                        <ButtonDefault onClick={() => { handleCancelValue() }} content="Hủy" bgBtn="bg-[#414143]  " />
                    </div>
                </div>
            </div>
        </>
    );
};

export default SettingUser;
