import { createContext, useEffect, useState } from 'react';
import { GetUserData ,GetUserDataLoginGoogle} from '../../services/auth/GetUserData';
export const DataUser = createContext();

const DataUserLogin = ({ children }) => {
    const [userEmail, setUserEmail] = useState(null);
    const [isAdmin, setIsAdmin] = useState(null);
    const [inforUser, setInforUser] = useState(null);

    const [inforUserDataGoogle , setInforUserDataGoogle] = useState({});
    useEffect(() => {
        const fetchData = async () => {
            try {
                const storeToken = localStorage.getItem('token');

                if (!storeToken) {
                    return;
                }
                const userDataGoogle = await GetUserDataLoginGoogle(storeToken?storeToken:null);
                if(userDataGoogle){
                    setInforUserDataGoogle(userDataGoogle);
                    return
                }
                 
                const token = JSON.parse(storeToken);
                const userData = await GetUserData(token);

                setInforUser(userData ? userData : null)
                setUserEmail(userData.email ? userData.email : null);
                setIsAdmin(userData.admin ? userData.admin : null)
            } catch (error) {
                console.log("Error:", error);
            }
        };
        fetchData();
    }, [])

    const userConext = {
        inforUser,
        userEmail,
        isAdmin,
        inforUserDataGoogle
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
