import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
const DeleteButton_square = ({clickDelete,titleDelete} ) => {
    const handleDeleteClick = () => {
        confirmAlert({
          title: titleDelete,
          message: 'Bạn có chắc chắn muốn xóa?',
          buttons: [
            {
              label: 'Có',
              onClick: () => clickDelete()
            },
            {
              label: 'Hủy',
              onClick: () => {}
            }
          ]
        });
      };
    return (
        <>
            <button onClick={handleDeleteClick} className="inline-flex justify-center items-center whitespace-nowrap focus:outline-none transition-colors focus:ring duration-150 border cursor-pointer rounded border-red-600 dark:border-red-500 ring-red-300 dark:ring-red-700 bg-red-600 dark:bg-red-500 text-white hover:bg-red-700 hover:border-red-700 hover:dark:bg-red-600 hover:dark:border-red-600 mr-3 last:mr-0 mb-3 undefined p-1" type="button"><span className="inline-flex justify-center items-center w-6 h-6 "><svg viewBox="0 0 24 24" width="16" height="16" className="inline-block"><path fill="currentColor" d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M9,8H11V17H9V8M13,8H15V17H13V8Z"></path></svg></span></button>
        </>
    );
};

export default DeleteButton_square;