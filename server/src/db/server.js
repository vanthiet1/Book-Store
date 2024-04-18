const mongoose = require('mongoose');
const dotenv = require('dotenv')

dotenv.config()
const connectDB  = async ()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log('Đã Kết Nối Tới DB');
    } catch (error) {
        console.log("lỗi kết nối");
    }
}
module.exports = connectDB;