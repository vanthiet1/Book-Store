import { useContext , useMemo  } from "react";
import { Routes, Route } from 'react-router-dom'
import { Uicontext } from "~/contexts/UiContext";
import { DisplayPopup } from "~/pages/AdminPage/contexts/UiContextAdmin";
import Login from '~/layouts/Contents/Form/Login'
import Register from "~/layouts/Contents/Form/Register";
import VetifyAccount from "~/layouts/Contents/Form/VetifyAccount";
import ToastContainer from "~/components/notification/ToastContainers";
import publicRouterUser from "~/routes/RouterUser";
import PublicRouterAdmin from "~/routes/RouterAdmin";
import Cart from "~/layouts/Contents/MainCart/Cart";
const App = () => {
  const { displayRegister, displayLogin, filter, displayVertify, displayCart } = useContext(Uicontext);
  const { filterAdmin } = useContext(DisplayPopup);
  const privateRouterAdmin = PublicRouterAdmin();
    console.log('CCCCCCCC');
    
    const loginComponent = useMemo(() => {
      return displayLogin ? <Login /> : null;
    }, [displayLogin]);
  
    const registerComponent = useMemo(() => {
      return displayRegister ? <Register /> : null;
    }, [displayRegister]);
  
    const vertifyComponent = useMemo(() => {
      return displayVertify ? <VetifyAccount /> : null;
    }, [displayVertify]);
  return (
    <>
         
        <ToastContainer />
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
          {privateRouterAdmin.map((route, index) => (
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
        <div>
          {loginComponent}
          {registerComponent}
          {vertifyComponent}
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