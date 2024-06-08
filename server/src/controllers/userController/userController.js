const jwt = require('jsonwebtoken');
const User = require('../../models/auth/user');
const sendForgotPasswordMail = require('../../helpers/forgotPasswordMail');
const crypto = require('crypto');

const generateRandomString = (length) => {
    return crypto.randomBytes(Math.ceil(length / 2))
        .toString('hex')
        .slice(0, length);
};
const userController = {
    getUserInfo: async (req, res) => {
        try {
            const token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const userId = decoded.userId;
            // Tìm người dùng trong cơ sở dữ liệu
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ message: 'Không tìm thấy người dùng' });
            }
            // Hiển thị tên người dùng
            res.status(200).json(user);

        } catch (error) {
            console.error('Đã xảy ra lỗi:', error);
            res.status(500).json({ message: 'Đã xảy ra lỗi trong quá trình lấy thông tin người dùng' });
        }
    },
    getUserByid: async (req, res) => {
        try {
            const { id } = req.params;
            const getUser = await User.findById(id)
            res.status(200).json(getUser)
        } catch (error) {
            res.status(500).json(error)
        }
    },

    forgotPassword: async (req, res) => {
        try {
            const { email } = req.body;
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ message: "Email chưa đăng ký không thể thực hiện chức năng" });
            }

            const randomString = generateRandomString(10);
            user.randomString = randomString;
            user.resetTokenExpires = new Date();
            await user.save();

            await sendForgotPasswordMail({ email, token: randomString });
            res.status(200).json({ message: "Thành công vui lòng check mail" });
        } catch (error) {
            console.error("Error sending email:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    },

    getUserDetailsUserGoogle: async (req, res) => {
        try {
            const { googleId } = req.body;
    
            if (typeof googleId !== 'string') {
                return res.status(400).json({ message: 'Định dạng googleId không hợp lệ.' });
            }
    
            const userGoogleId = await User.findOne({ googleId: googleId });
    
            if (!userGoogleId) {
                return res.status(404).json({ message: 'Không tìm thấy chi tiết người dùng.' });
            }
    
            console.log(userGoogleId);
            res.status(200).json(userGoogleId);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Lỗi máy chủ nội bộ', error });
        }
    }
    
    




}



module.exports = userController;