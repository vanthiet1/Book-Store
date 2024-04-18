import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';


const Error = ({ message }) => {
    useEffect(() => {
        toast.error(message, { autoClose: 1000 });
    }, [message]);
    return null;
};

export default Error
