import { createContext, useState } from 'react';

export const UserRegisterAcc = createContext();

 const DataUserRegister = ({ children }) => {
  const [userData, setUserData] = useState(null);
  return (
    <UserRegisterAcc.Provider value={{ userData, setUserData }}>
      {children}
    </UserRegisterAcc.Provider>
  );
};
export default DataUserRegister