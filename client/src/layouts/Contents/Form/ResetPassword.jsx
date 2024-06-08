import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateFormResetPassword } from "@components/validateForm/Form";
import { ressetPassword } from "~/services/auth/ResetPassword";
import Success from "~/components/notification/Success";
<<<<<<< HEAD
import Error from "~/components/notification/Error";
import { Uicontext } from "~/contexts/UiContext";
import { useContext } from "react";
=======
// import Error from "~/components/notification/Error";
>>>>>>> 7cfb221b0d1aee8a5085275b33def3c2fef5b8a1
const ResetPassword = () => {
  const { handleDisplayLogin} = useContext(Uicontext)
    const [isResetSuccess, setIsResetSuccess] = useState(false);
<<<<<<< HEAD
    const [isNotRegister, setIsNotRegister] = useState(false);
     const navigate = useNavigate();
=======
    // const [isNotRegister, setIsNotRegister] = useState(false);

>>>>>>> 7cfb221b0d1aee8a5085275b33def3c2fef5b8a1
    const formik = useFormik({
      initialValues: {
          newPassword: "",
          confirmPassword: "",
          codeVertify:""
      },
      validationSchema: validateFormResetPassword,
      onSubmit: async ({newPassword,codeVertify}) => {
        try {
            const hashedUserId = localStorage.getItem('userId');
            //  if(hashedUserId === null){
            //     return setIsNotRegister(true)
            //  }
            const userId = atob(hashedUserId);
            const resetPass = {
                newPassword: newPassword,
                randomString:codeVertify
            }
          const result = await ressetPassword(userId,resetPass);
          setIsResetSuccess(result.message)
          setTimeout(() => {
            navigate('/');
            handleDisplayLogin()
          }, 2000);
        } catch (error) {
          console.log(error);
        }
      },
    });
    return (
      <>
      {<Success message={isResetSuccess}/>}
      {/* { isNotRegister && <Error message={"Chưa đăng ký "}/>} */}
        <div className="flex w-[30%] flex-col justify-center px-6 py-12 lg:px-8 bg-[#1A1918] opacity-[0.9] rounded-lg fixed z-40 top-[0%] left-[35%]">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
              Đổi mật khẩu
            </h2>
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" method="POST" onSubmit={formik.handleSubmit}>
              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium leading-6 text-white">
                  Mật khẩu mới
                </label>
                <div className="mt-2">
                  <input
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    autoComplete="newPassword"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-4"
                    value={formik.values.newPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Nhập mật khẩu mới"
                  />
                  {formik.errors.newPassword && (
                    <p className="text-red-500 p-2">{formik.errors.newPassword}</p>
                  )}
                </div>
              </div>
  
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="confirmPassword" className="block text-sm font-medium leading-6 text-white">
                    Nhập lại mật khẩu mới
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    autoComplete="confirmPassword"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-4"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Nhập lại mật khẩu mới"
                  />
                  {formik.errors.confirmPassword && (
                    <p className="text-red-500 p-2">{formik.errors.confirmPassword}</p>
                  )}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="confirmPassword" className="block text-sm font-medium leading-6 text-white">
                    Nhập mã xác nhận
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="codeVertify"
                    name="codeVertify"
                    type="string"
                    autoComplete="codeVertify"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-4"
                    value={formik.values.codeVertify}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Nhập mã xác nhận"
                  />
                  {formik.errors.codeVertify && (
                    <p className="text-red-500 p-2">{formik.errors.codeVertify}</p>
                  )}
                </div>
              </div>
  
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                 Đổi mật khẩu
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  };
  
  export default ResetPassword;
  

