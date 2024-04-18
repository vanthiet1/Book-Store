require('dotenv').config()
const nodemailer = require('nodemailer');
const sendMail = async ({ email, subject, html }) => {

    let transporter = nodemailer.createTransport({
        host: "smtp.gnail.com",
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
    const message = {
        from: '"Read-Book" <book@gmail.com>', 
        to:email, 
        subject: subject,
        html: html
    }
    const result = await transporter.sendMail(message);
    return result;
}
module.exports = sendMail;