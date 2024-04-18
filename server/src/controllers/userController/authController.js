const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const moment = require('moment');
const User = require('../../models/auth/user');
const bcrypt = require("bcrypt");
const sendMail = require('../../helpers/sendMail');
dotenv.config()

const authControllers = {
    registerUser: async (req, res) => {
        try {
            const { email, password } = req.body;
            if (!req.body.email || !req.body.password) {
                return res.status(400).json({ message: "Vui lòng cung cấp địa chỉ email và mật khẩu" });
            }

            const existingUser = await User.findOne({ email });
            if (existingUser !== null) {
                return res.status(400).json({ message: "Email này đã được đăng ký" });
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const randomCode = Math.floor(100000 + Math.random() * 900000);

            const newUser = new User({
                email,
                password: hashedPassword,
                verificationCode: randomCode,
                expiresAt: new Date(Date.now() + 30 * 1000),
                status: false
            });

            const user = await newUser.save();

            await sendMail({
                email: newUser.email,
                subject: "Xác nhận tài khoản",
                html: `Vui lòng nhập mã xác nhận sau vào ứng dụng của bạn: <strong>${randomCode}</strong>`
            })

            res.status(200).json(user);
        } catch (error) {
            console.error("Error registering user:", error);
            res.status(500).json({ message: "Đã xảy ra lỗi trong quá trình đăng ký người dùng" });
        }
    },

    verifyCode: async (req, res) => {
        try {
            const { email, code } = req.body;
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(404).json({ message: "Người dùng không tồn tại" });
            }
         
            if (user.verificationCode !== code) {
                return res.status(400).json({ message: "Mã xác nhận không chính xác" });
            }
            if (user.status) {
                return res.status(400).json({ message: "Tài khoản đã được xác thực trước đó" });
            }
            if (user.expiresAt < Date.now()) {
                return res.status(400).json({ message: "Mã xác nhận đã hết hạn, vui lòng gửi lại" });
            }
            user.status = true;
            await user.save();
            res.status(200).json({ message: "Xác nhận thành công" });
        } catch (error) {
            console.error("Lỗi khi xác nhận mã:", error);
            res.status(500).json({ message: "Đã xảy ra lỗi khi xác nhận mã" });
        }
    },

    loginUser: async (req, res) => {
        const { email, password } = req.body;
        try {
            // check email 
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(404).json({ message: "Email không tồn tại" })
            }
            //   check pass
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Mật khẩu không đúng' });
            }
            // tạo jwt
            const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET)
            console.log(token);
            res.status(200).json({ token });
        } catch (error) {
            res.status(500).json(error)
        }
    },

    resendVerificationCode: async (req, res) => {
        try {
            const { email } = req.body;
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(404).json({ message: "Người dùng không tồn tại" });
            }
   
            if (user.verificationCount >= 5) {
                return res.status(400).json({ message: "Số lần gửi mã xác thực đã vượt quá giới hạn trong ngày" });
            }
    
            const newVerificationCode = Math.floor(100000 + Math.random() * 900000);
    
            user.verificationCode = newVerificationCode;
            user.expiresAt = moment().add(5, 'minutes');
            await user.save();
    
            // Gửi email chứa mã xác thực mới
            await sendMail({
                email: user.email,
                subject: "Mã xác thực mới",
                html: `Mã xác thực mới của bạn là: <strong>${newVerificationCode}</strong>`
            });
    
            user.verificationCount += 1;
            await user.save();
    
            res.status(200).json({ message: "Đã gửi lại mã xác thực", newVerificationCode });
        } catch (error) {
            console.error("Lỗi khi gửi lại mã xác thực:", error);
            res.status(500).json({ message: "Đã xảy ra lỗi khi gửi lại mã xác thực" });
        }
    },
    
    updateVerificationCount: async (userId) => {
        try {
            const user = await User.findById(userId);
            if (!user) {
                throw new Error('User not found');
            }
            user.verificationCount += 1;
            await user.save();
        } catch (error) {
            throw error;
        }
    },
    
    checkVerificationLimit: async (userId, maxLimitPerDay) => {
        try {
            const user = await User.findById(userId);
            if (!user) {
                throw new Error('User not found');
            }
            if (user.verificationCount >= maxLimitPerDay) {
                return false; 
            }
            return true; // Chưa vượt quá giới hạn
        } catch (error) {
            throw error;
        }
    },
    
    resetVerificationCount: async () => {
        try {
            await User.updateMany({}, { $set: { verificationCount: 0 } });
        } catch (error) {
            throw error;
        }
    }
       

};

module.exports = authControllers;
