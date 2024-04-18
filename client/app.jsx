import { useContext } from "react";
import { Routes, Route } from 'react-router-dom'
import { Uicontext } from "./src/contexts/UiContext";
import { DisplayPopup } from "./src/pages/AdminPage/contexts/UiContextAdmin";
import Login from './src/layouts/Contents/Form/Login'
import Register from "./src/layouts/Contents/Form/Register";
import VetifyAccount from "./src/layouts/Contents/Form/VetifyAccount";
import ToastContainer from "./src/components/notification/ToastContainers";
import publicRouterUser from "./src/routes/RouterUser";
import PublicRouterAdmin from "./src/routes/RouterAdmin";
import Cart from "./src/layouts/Contents/MainCart/Cart";
const App = () => {
  const { displayRegister, displayLogin, filter, displayVertify, displayCart } = useContext(Uicontext);
  const { filterAdmin } = useContext(DisplayPopup);


  const adminRoutes = PublicRouterAdmin();
  return (
    <>
      <div className=" w-full h-dvh ">
        <Routes>
          {publicRouterUser.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={
                <route.component />
              }
            />
          ))}
          {adminRoutes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              exact
              element={
                <route.component />
              }
            />
          ))}
        </Routes>
        <ToastContainer />
        <div>
          {displayLogin && (<Login />)}
          {displayRegister && (<Register />)}
          {displayVertify && (<VetifyAccount />)}
        </div>
        <div className={`${filter} ${filterAdmin}`} />
      </div>
      <div className={`fixed z-10 top-0 right-0 ${displayCart} ease-in duration-300 `}>
        <Cart />
      </div>
    </>
  );
};

export default App;