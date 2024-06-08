import * as Yup from 'yup';

const validateFormRegister = Yup.object(
    {
        email: Yup.string()
            .email("Email không hợp lệ")
            .required("Email không được để trống"),
        password: Yup.string()
            .min(8, "Mật khẩu quá ngắn")
            .required("Mật khẩu không được để trống"),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Mật khẩu không khớp')
            .required('Vui lòng nhập lại mật khẩu')
    }
);

const validateFormLogin = Yup.object({
    email: Yup.string()
        .email("Email không hợp lệ")
        .required("Email không được để trống"),
    password: Yup.string()
        .min(8, "Mật khẩu quá ngắn")
        .required("Mật khẩu không được để trống"),
});

const validateFormForgotPassword = Yup.object({
    email: Yup.string()
        .email("Email không hợp lệ")
        .required("Email không được để trống"),
});

const validateFormResetPassword = Yup.object({
    newPassword: Yup.string()
        .min(3, "Mật khẩu quá ngắn")
        .required("Mật khẩu không được để trống"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('newPassword'), null], 'Mật khẩu không khớp')
        .required('Vui lòng nhập lại mật khẩu'),
   codeVertify: Yup.string()
        .required("Mã xác nhận không được để trống")
 
});


export {
    validateFormForgotPassword,
    validateFormRegister,
    validateFormLogin,
    validateFormResetPassword
}