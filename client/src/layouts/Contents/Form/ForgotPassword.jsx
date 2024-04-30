import { useContext, useState } from "react";
import { useFormik } from "formik";
import { HashLoader } from "react-spinners";
import Error from "~/components/notification/Error";
import Success from "~/components/notification/Success";
import Close from "@components/icons/Close";
import { validateFormForgotPassword } from "~/components/validateForm/Form";
import { verifyForgotPassword } from "~/services/auth/ForgotPassUser";
import { Uicontext } from "~/contexts/UiContext";
const ForgotPassword = () => {
  const { handleHideForgot } = useContext(Uicontext);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [errorForgotPass,setErorForgotPass] = useState(false);
  const [successForgotPass,setsuccessForgotPass] = useState(false);


  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validateFormForgotPassword,
    onSubmit: async (values) => {
      setIsForgotPassword(true);
      try {
        const forGot = await verifyForgotPassword(values);
        if(forGot === undefined){
          setErorForgotPass(true);
          setTimeout(() => {
            handleHideForgot()
          }, 1000);
        }else{
          setsuccessForgotPass(true);
          setTimeout(() => {
            handleHideForgot()
          }, 1000);
        }

      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <>
    {errorForgotPass && <Error  message={'Chưa đăng ký không thể thực hiện thao tác'}  />}
    {successForgotPass && <Success  message={'Vui lòng kiểm tra gmail'}  />}

      <div className="flex w-[30%] flex-col justify-center px-6 py-12 lg:px-8 bg-[#1A1918] opacity-[0.9] rounded-lg fixed z-40 top-[0%] left-[35%] max-md:w-[100%] max-md:left-0 max-md:opacity-[1]">
        <Close onClick={handleHideForgot} />
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
            Quên Mật Khẩu
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" method="POST" onSubmit={formik.handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
                Nhập email
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
                  <p className="text-red-500 p-2">{formik.errors.email}</p>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"

              >
                {isForgotPassword ? (
                  <HashLoader color="#fff" size={30} />
                ) : (
                  <span>Xác nhận quên mật khẩu</span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;