import { createContext, useEffect, useState } from 'react';
import { GetUserData } from '../../services/auth/GetUserData';

export const DataUser = createContext();

const DataUserLogin = ({ children }) => {
    const [userEmail, setUserEmail] = useState(null);
    const [isAdmin, setIsAdmin] = useState(null);
    const [inforUser, setInforUser] = useState(null)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const storeToken = localStorage.getItem('token');
                if (!storeToken) {
                    return;
                }
                const token = JSON.parse(storeToken);
                const userData = await GetUserData(token);
                setInforUser(userData)
                setUserEmail(userData.email);
                setIsAdmin(userData.admin)
            } catch (error) {
                console.log("Error:", error);
            }
        };
        fetchData();
    }, [])

    const userConext = {
        inforUser,
        userEmail,
        isAdmin
    }

    return (
        <div>
            <DataUser.Provider value={userConext}>
                {children}
            </DataUser.Provider>
        </div>
    );
};

export default DataUserLogin;
