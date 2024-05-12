import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
const ConfirmButton  = ({ clickConfirm, titleConfirm}) => {
    const handleConfirmClick = () => {
        confirmAlert({
            title: titleConfirm,
            message: 'Bạn có chắc muốn xác nhận đơn hàng',
            buttons: [
                {
                    label: 'Có',
                    onClick: () => clickConfirm()
                },
                {
                    label: 'Hủy',
                    onClick: () => { }
                }
            ]
        });
    };
    return (
        <>
            <button onClick={handleConfirmClick} className="inline-flex justify-center items-center whitespace-nowrap focus:outline-none transition-colors focus:ring duration-150 border cursor-pointer rounded border-green-600 dark:border-green-500 ring-green-300 dark:ring-green-700 bg-green-600 dark:bg-green-500 text-white hover:bg-green-700 hover:border-green-700 hover:dark:bg-green-600 hover:dark:border-green-600 mr-3 last:mr-0 mb-3 p-1" type="button">
                <span className="inline-flex justify-center items-center w-6 h-6">
                    <svg viewBox="0 0 24 24" width="16" height="16" className="inline-block">
                        <path fill="currentColor" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
                    </svg>
                </span>
            </button>


        </>
    );
};

export default ConfirmButton;