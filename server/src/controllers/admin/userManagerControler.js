const User = require('../../models/auth/user');

const getAllUserController = {
    getAllUsers: async (req, res) => {
        try {
         const users = await User.find();
         if(!users){
            return  res.status(404).json({message: 'User not found'})
         }
            res.status(200).json(users);
        } catch (error) {
            console.error('Đã xảy ra lỗi:', error);
            res.status(500).json({ message: 'Đã xảy ra lỗi trong quá trình lấy danh sách người dùng' });
        }
    },
    deleteUser: async (req,res)=>{
        try {
            const  {id} = req.params;
             const user = await User.findByIdAndDelete(id);
              if(!user){
                return res.status(404).json({message:"Không tìm thấy user để xóa"})
              }
             res.status(200).json("xóa thành công")
        } catch (error) {
            res.status(500).json({ message:"Xóa không thành công"})
        }
    }

}
module.exports = getAllUserController;