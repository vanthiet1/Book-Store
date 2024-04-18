import * as Yup from 'yup';

 const validateFormRegister = Yup.object(
    {
    email: Yup.string()
        .email("Email không hợp lệ")
        .required("Email không được để trống"),
    password: Yup.string()
        .min(3, "Mật khẩu quá ngắn")
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

// const validateFormComment = Yup.object({

// })


export {
    validateFormRegister,
    validateFormLogin
}