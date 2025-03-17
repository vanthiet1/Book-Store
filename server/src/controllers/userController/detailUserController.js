const UserDetails = require('../../models/auth/deltailUserModel')

const userDetailContainer = {
    postUserDetails: async (req, res) => {
        try {
            const { userId, phoneNumber, address } = req.body;
            const userDetails = new UserDetails({
                userId,
                phoneNumber,
                address
            });
            const savedUserDetails = await userDetails.save();
            res.status(201).json(savedUserDetails);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Đã xảy ra lỗi khi tạo chi tiết người dùng.' });
        }
    },
    getAllUserDetails: async (req, res) => {
        try {
         
            const userDetails = await UserDetails.find();
            if (!userDetails) {
                return res.status(404).json({ message: 'Không lấy được thông tin người dùng.' });
            }
            res.status(200).json(userDetails);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Đã xảy ra lỗi khi lấy thông tin người dùng.' });
        }
    },
    
    getUserDetailsByUserId: async (req, res) => {
        try {
            const { userId } = req.params;
            const userDetails = await UserDetails.findOne({ userId });
            if (!userDetails) {
                return res.status(404).json({ message: 'Không tìm thấy chi tiết người dùng.' });
            }
            res.status(200).json(userDetails);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Đã xảy ra lỗi khi lấy chi tiết người dùng.' });
        }
    },

   updateUserDetails: async (req, res) => {
        try {
            const userId = req.params.id;
            const { phoneNumber, address } = req.body;
            const existingUser = await UserDetails.findOne({ userId });
            if (!existingUser) {
                return res.status(404).json({ success: false, message: 'Không tìm thấy người dùng' });
            }
            
            existingUser.phoneNumber = phoneNumber;
            existingUser.address = address;
            const updatedUser = await existingUser.save();
    
            res.status(200).json(updatedUser);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Lỗi server" });
        }
    },
       getUserDetailsByGoogle: async (req, res) => {
        try {
            const { id } = req.params;
            const userDetails = await User.findOne({ googleId:id });
            if (!userDetails) {
                return res.status(404).json({ message: 'Không tìm thấy chi tiết người dùng.' });
            }
            res.status(200).json(userDetails);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Đã xảy ra lỗi khi lấy chi tiết người dùng.' });
        }
    },

}
module.exports = userDetailContainer;


