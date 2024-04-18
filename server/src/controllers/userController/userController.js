const User = require('../../models/auth/user');
const jwt = require('jsonwebtoken');
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
        res.status(500).json({message:"lỗi server"})
              
         }
    },

}
module.exports = userController;