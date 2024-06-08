import { useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import ButtonDefault from "../../../components/button-ui/ButtonDefault";
import { DataUser } from "../../../contexts/authContext/DataUserLogin";
import { PostDetailUser, UpdateDetailUser, GetDetailUserLoginGoogle, GetDetailUser } from "../../../services/checkout/detailUserService";
import Error from "@components/notification/Error";
import Success from "@components/notification/Success";

const SettingUser = () => {
    const { inforUser, inforUserDataGoogle } = useContext(DataUser);
    const [addressUser, setAddressUser] = useState("");
    const [phoneNumber, setPhoneNumberUser] = useState("");
    const [detailUser, setDetailUser] = useState(null);
    const [detailUserLoginGoogle, setDetailUserLoginGoogle] = useState(null);
    const [error, setError] = useState(false);
    const [addressError, setAddressError] = useState(false);
    const [phoneError, setPhoneError] = useState(false);
    const [phoneRegexError, setPhoneRegexError] = useState(false);
    const [successPost, setSuccessPost] = useState(false);
    const [successUpdate, setSuccessUpdate] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const updateAddressAndPhone = () => {
            const address = detailUser ? detailUser.address : "";
            const phone = detailUser ? detailUser.phoneNumber  : "";
            setAddressUser(address);
            setPhoneNumberUser(phone);
        };
        updateAddressAndPhone();
    }, [inforUser, detailUser, inforUserDataGoogle, detailUserLoginGoogle]);

    const fetchDetailUser = async () => {
        try {
            if (!(inforUser && inforUser._id) && !inforUserDataGoogle) return;
            if (inforUserDataGoogle) {
                const inforUserLoginGoogle = await GetDetailUserLoginGoogle(inforUserDataGoogle?.sub);
                setDetailUserLoginGoogle(inforUserLoginGoogle);
            }

            const userId = detailUserLoginGoogle?._id || inforUser?._id;
            console.log(userId);
            if (userId) {
                const inforDetailUser = await GetDetailUser(userId);
                setDetailUser(inforDetailUser);
            }
        } catch (error) {
            console.log("Error fetching user details:", error);
        }
    };

    useEffect(() => {
        fetchDetailUser();
    }, [inforUser, inforUserDataGoogle]);

    
    const handlePostInforUser = async () => {
        try {
            setError(false);
            setAddressError(false);
            setPhoneError(false);
            setPhoneRegexError(false);

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
            const userId = detailUserLoginGoogle?._id || inforUser?._id;
         console.log(detailUserLoginGoogle);
          console.log(inforUser);

            console.log(userId);
            const data = {
                userId: userId,
                phoneNumber: phoneNumber,
                address: addressUser,
            };
            console.log(data);
            await PostDetailUser(data);
            setSuccessPost(true);
            setTimeout(() => {
                navigate('/book/checkout');
            }, 1000);
        } catch (error) {
            console.log("Error posting user information:", error);
        }
    };

    const handleUpdateDetailUser = async () => {
        try {
            setPhoneRegexError(false);
            const phoneRegex = /^[0-9]{10}$/;
            if (!phoneRegex.test(phoneNumber)) {
                setPhoneRegexError(true);
                return;
            }

            const userId = inforUser?._id || detailUserLoginGoogle?._id;
            const data = {
                phoneNumber: phoneNumber,
                address: addressUser,
            };
            await UpdateDetailUser(userId, data);
            setSuccessUpdate(true);
        } catch (error) {
            console.log("Error updating user information:", error);
        }
    };

    const handleSubmitUser = async () => {
        try {
            if (!detailUser && !detailUserLoginGoogle) {
                await handlePostInforUser();
            } else {
                await handleUpdateDetailUser();
            }
            fetchDetailUser();
            navigate('/account/profile');
        } catch (error) {
            console.log("Error submitting user information:", error);
        }
    };

    const handleCancelValue = () => {
        if (!detailUser) {
            setAddressUser("");
            setPhoneNumberUser("");
        }
    };

    useEffect(() => {
        if (successUpdate) {
            setTimeout(() => {
                setSuccessUpdate(false);
            }, 3000);
        } else if (phoneRegexError) {
            setTimeout(() => {
                setPhoneRegexError(false);
            }, 3000);
        }
    }, [successUpdate, phoneRegexError]);

    return (
        <>
            {phoneRegexError && <Error message="Số điện thoại không hợp lệ" />}
            {error && <Error message="Vui lòng đăng nhập để cập nhật thông tin" />}
            {successPost && <Success message="Thêm thông tin thành công" />}
            {successUpdate && <Success message="Cập nhật thông tin thành công" />}
            <div className="pt-4">
                <div className="w-1/2 max-lg:w-full">
                    <div className="bg-[#2A2A2C] rounded-[15px] border border-[#515151] pl-3 py-2 mb-5">
                        <span className="text-[#B3B3B3] block">Tên đăng nhập</span>
                        <span className="text-[#fff] block">{inforUserDataGoogle?.email || inforUser?.email || "Chưa đăng nhập"}</span>
                    </div>
                    <div className="bg-[#2A2A2C] rounded-[15px] border border-[#515151] pl-3 py-2 mb-5">
                        <span className="text-[#B3B3B3] block">ID người dùng</span>
                        <span className="text-[#fff] block">{inforUserDataGoogle?.sub || inforUser?._id.slice(0, 9) || "Chưa đăng nhập"}</span>
                    </div>
                    <div className="bg-[#2A2A2C] rounded-[15px] border border-[#515151] pl-3 py-3 mb-3">
                        <input
                            placeholder="Cập nhật địa chỉ"
                            className={`w-[95%] bg-transparent outline-none text-[#fff] ${addressError ? 'border-red-500' : ''}`}
                            type="text"
                            value={addressUser}
                            onChange={(e) => setAddressUser(e.target.value)}
                        />
                        {addressError && <p className="text-red-500 text-sm">Vui lòng nhập địa chỉ</p>}
                    </div>
                    <div className="bg-[#2A2A2C] rounded-[15px] border border-[#515151] pl-3 py-3">
                        <input
                            placeholder="Cập số điện thoại"
                            className={`w-[95%] bg-transparent outline-none text-[#fff] ${phoneError ? 'border-red-500' : ''}`}
                            type="text"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumberUser(e.target.value)}
                        />
                        {phoneError && <p className="text-red-500 text-sm">Vui lòng nhập số điện thoại</p>}
                    </div>
                    <div className="flex pt-3 gap-3">
                        <ButtonDefault onClick={handleSubmitUser} content="Cập nhật" bgBtn="bg-[#139F7B]" />
                        <ButtonDefault onClick={handleCancelValue} content="Hủy" bgBtn="bg-[#414143]" />
                    </div>
                </div>
            </div>
        </>
    );
};

export default SettingUser;
