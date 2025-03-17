import { IoQrCode } from "react-icons/io5";
import { FaWallet } from "react-icons/fa6";

const MethodPayment = (props) => {
    const { ClickoptionQrCode, borderActive } = props;

    const handleOptionClick = (option) => {
        ClickoptionQrCode(option);
    };

    return (
        <>
            <div
                onClick={() => handleOptionClick(1)}
                className={`flex ease-in duration-200 items-center gap-3 border  w-[100%] h-[70px] pl-3 rounded-[20px] cursor-pointer   mb-2   ${
                    borderActive === 1 ? 'border-[#15B088]' : 'border-slate-600'
                }`}
            >
                <IoQrCode className={`text-[30px]  ${
                    borderActive === 1 ? 'text-[#15B088]' : 'text-[#fff]'
                }`} />
                <span className="text-[#fff]">Quét QR CODE</span>
            </div>
            <div
                onClick={() => handleOptionClick(2)}
                className={`flex ease-in duration-200 items-center gap-3 border  w-[100%] h-[70px] pl-3 rounded-[20px] cursor-pointer  ${
                    borderActive === 2 ? 'border-[#15B088]' : 'border-slate-600'
                }`}
            >
                <FaWallet className={`text-[30px]  ${
                    borderActive === 2 ? 'text-[#15B088]' : 'text-[#fff]'
                }`} />
                <span className="text-[#fff]">Tiền mặt</span>
            </div>
        </>
    );
};

export default MethodPayment;
