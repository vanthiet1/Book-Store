import { useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Success = ({ message }) => {
    useEffect(() => {
        toast.success(message, { autoClose: 1000 });
    }, [message]);

    return null;
};

export default Success;
