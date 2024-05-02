import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
const ButtonConfirm  = (props) => {
    const {clickDelete, titleDelete , bgBtn , content}= props
    const handleConfirmClick = () => {
        confirmAlert({
            title: titleDelete,
            message: 'Bạn có chắc muốn xóa tài khoản',
            buttons: [
                {
                    label: 'Có',
                    onClick: () => clickDelete()
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
          <button onClick={handleConfirmClick} className={`text-[#fff] ${bgBtn} rounded-full p-2 px-3`}>{content}</button>
        </>
    );
};

export default ButtonConfirm;