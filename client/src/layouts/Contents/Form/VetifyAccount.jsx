import { useState, useRef, useEffect, useContext } from "react";
import { ResendClick } from "../../../components/verifyAccountUser/timeVerifyAccount";
import VertifyAuth from "../../../services/auth/VertifyAuth";
import { UserRegisterAcc } from "../../../contexts/authContext/DataUserRegister";
import { Uicontext } from "../../../contexts/UiContext";
import { DataUser } from "~/contexts/authContext/DataUserLogin";

const VerifyAccount = () => {
    const { userData } = useContext(UserRegisterAcc);
    const { inforUser } = useContext(DataUser);
    const inputsRef = useRef([]);
    const [allInfor, setAllInfor] = useState(null);
    const [verificationCode, setVerificationCode] = useState(Array(6).fill(""));
    const [errorIndices, setErrorIndices] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [resendEnabled, setResendEnabled] = useState(true);
    const [timeOtp, setTimeOtp] = useState(500);

    const { handleHideVertify } = useContext(Uicontext);


    useEffect(() => {
        const newInfor = userData && userData.email ? userData.email : inforUser.email;
        setAllInfor(newInfor);
    }, [userData, inforUser]);

    const handleInputChange = (index, event) => {
        const { value } = event.target;
        const newVerificationCode = [...verificationCode];
        newVerificationCode[index] = value;
        setVerificationCode(newVerificationCode);
        const nextIndex = index + 1;
        const nextInput = inputsRef.current[nextIndex];
        if (nextInput && value !== "" && index < 5) {
            nextInput.focus();
        }
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const newErrorIndices = verificationCode.reduce((acc, curr, index) => {
                if (curr === "") {
                    acc.push(index);
                }
                return acc;
            }, []);
            setErrorIndices(newErrorIndices);
            if (newErrorIndices.length !== 0) {
                setErrorMessage("Nhập đầy đủ")
                return;
            }
            if (!allInfor) {
                console.error("UserData null");
                return;
            }

            const code = verificationCode.join("");
            const dataVertifyAurth = {
                email: allInfor,
                code: Number(code)
            }
            await VertifyAuth.VertifyAuth(dataVertifyAurth);
            handleHideVertify();
            setErrorMessage("");
            setResendEnabled(false);
        } catch (error) {
            console.log(error);
        }
    };
    const handleResendClick = async () => {
        if (!allInfor) {
            console.error("UserData null");
            return;
        }
        const data = {
            email: allInfor
        }
        try {
            ResendClick(setTimeOtp, setResendEnabled)
            await VertifyAuth.ResendVerifiAuth(data)
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <>

            <div className="flex w-[30%] flex-col justify-center px-6 py-8 lg:px-8 bg-[#1A1918] opacity-[0.9.5] rounded-lg fixed z-10 top-[15%] left-[35%]">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm pb-3">
                    <h2 className=" text-center text-2xl font-bold leading-9 tracking-tight text-white">
                        Xác Thực Tài Khoản
                    </h2>
                    <span className="text-white block text-center text-[14px]">
                        Điền Mã Xác Thực Được Gửi Trong Gmail
                    </span>
                </div>
                <div className=" sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="flex space-x-2">
                            {[...Array(6)].map((_, index) => (
                                <div key={index} className="w-1/6">
                                    <input
                                        maxLength={1}
                                        id={`otp-${index}`}
                                        name={`otp-${index}`}
                                        type="text"
                                        autoComplete={`otp-${index}`}
                                        ref={(input) => (inputsRef.current[index] = input)}
                                        onChange={(event) => handleInputChange(index, event)}
                                        value={verificationCode[index] || ""}
                                        className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-6 outline-none ${errorIndices.includes(index) ? "ring-red-500" : ""
                                            }`}
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="text-red-500">
                            {errorMessage}
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Xác Thực
                            </button>
                        </div>
                        <div className="flex gap-1">
                            <span className="text-[#fff]">Bạn có muốn nhận lại mã ?</span>

                            {resendEnabled ? (
                                <span onClick={handleResendClick} className="text-[#fff] font-semibold cursor-pointer">
                                    Gửi Lại ?
                                </span>
                            ) : (
                                <span className="text-[#fff] font-semibold">
                                    {Math.floor(timeOtp / 60)}:{timeOtp % 60 < 10 ? `0${timeOtp % 60}` : timeOtp % 60}
                                </span>
                            )}

                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default VerifyAccount;
