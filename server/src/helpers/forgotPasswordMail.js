require('dotenv').config()
const nodemailer = require('nodemailer');
const sendForgotPasswordMail = async ({ email, token }) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
    // http://localhost:1000
    const resetLink = `https://book-store-silk-two.vercel.app/resetPassword?token=${token}`;
  
    const message = {
        from: '"Read-Book" <book@gmail.com>', 
        to: email, 
        subject: 'Xác nhận đổi mật khẩu',
        html: `<p>Chào bạn,</p>
               <p>Bạn đã yêu cầu đặt lại mật khẩu. Vui lòng nhấp vào liên kết sau để đặt lại mật khẩu:</p>
               <a href="${resetLink}">${resetLink}</a>`
    };

    const result = await transporter.sendMail(message);
    return result;
};

module.exports = sendForgotPasswordMail;

module.exports = sendForgotPasswordMail;
