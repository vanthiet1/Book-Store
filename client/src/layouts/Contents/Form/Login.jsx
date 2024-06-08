import { useContext, useState } from "react";
import { useFormik } from "formik";
import { validateFormLogin } from "@components/validateForm/Form";
import Error from "@components/notification/Error";
import Close from "@components/icons/Close";
import { Uicontext } from "../../../contexts/UiContext";
import { LoginAuth } from "../../../services/auth/LoginAuth";
import { UserRegisterAcc } from "../../../contexts/authContext/DataUserRegister";
import { GetUserData } from "../../../services/auth/GetUserData";
import LoginGoogle from "./LoginGoogle";

const Login = () => {
  const { userData } = useContext(UserRegisterAcc);
  const { handleDisplayRegister, handleHideLogin, handleDisplayVertifyInlogin ,handleDisplayForgot } = useContext(Uicontext);
  const [errorMessage, setErrorMessage] = useState("");


  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validateFormLogin,
    onSubmit: async (values) => {
      try {
        const token = await LoginAuth.login(values, setErrorMessage);
        localStorage.setItem('token', JSON.stringify(token))
        const user =  await GetUserData(token);
        const userId = user?user._id:null;
        const hashedUserId = btoa(userId)
        localStorage.setItem('userId',hashedUserId)
        window.location.assign('/')
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <>
      {errorMessage && <Error message={errorMessage} />}
      <div className="flex w-[30%] flex-col justify-center px-6 py-12 lg:px-8 bg-[#1A1918] opacity-[0.9] rounded-lg fixed z-40 top-[0%] left-[35%] max-md:w-[100%] max-md:left-0 max-md:opacity-[1] max-md:top-[-10px] max-md:h-dvh mã:w-[50%]">
        <Close onClick={() => handleHideLogin()} />
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
            Đăng Nhập
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" method="POST" onSubmit={formik.handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
                Địa chỉ email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-4"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Example@gmail.com"
                />
                {formik.errors.email && (
                  <p className="text-red-500">{formik.errors.email}</p>
                )}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
                  Mật khẩu
                </label>

              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-4"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="@123********"
                />
                {formik.errors.password && (
                  <p className="text-red-500">{formik.errors.password}</p>
                )}
              </div>
            </div>

            <div>
              <button  type="submit"
                className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"

              >
                Đăng nhập
              </button>
            </div>
          </form>

          <div className="pt-4">
            <div className="flex justify-center py-3">
              <h2 className="text-white">Hoặc đăng nhập với</h2>
            </div>
            <div className="flex justify-center items-center">
              <div>
                <button className="bg-blue-500 font-bold text-white p-2 rounded-full w-[150px]">Facebook</button>
              </div>

              <div>
              <LoginGoogle LoginAuth={LoginAuth}/>
              </div>
            </div>

          </div>
          <div className="flex items-center pt-4 justify-center gap-2">
            <h2 className="text-white">Đăng ký tài khoản?</h2>
            <button className="text-green-500" onClick={handleDisplayRegister}>Đăng ký</button>
          </div>

          <div className="flex justify-center py-1">
            <span onClick={handleDisplayForgot}  className="font-semibold text-indigo-600 hover:text-indigo-500 cursor-pointer">
              Quên mật khẩu?
            </span>
          </div>
          {userData !== null && (
            <div className="flex justify-center py-1">
              <a onClick={handleDisplayVertifyInlogin} href="#" className="font-semibold text-red-600 hover:text-red-500">
                Xác nhận lại tài khoản
              </a>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Login;