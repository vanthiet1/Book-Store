const Checkout = require('../../models/checkout/checkoutModel');

const checkoutController = {
    getAllCheckoutUser: async (req, res) => {
        try {
            const dataCheckout = await Checkout.find();
            if (!dataCheckout) {
                return res.status(404).json({ message: 'Không tìm thấy thông tin sản phẩm thanh toán ' });
            }
            res.status(200).json(dataCheckout);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Đã xảy ra lỗi khi lấy thông tin thanh toán.' });
        }
    },
    getCheckoutByUserId: async (req, res) => {
        try {
            const { userId } = req.params;
            const dataCheckouts = await Checkout.find({ userId });
    
            if (!dataCheckouts || dataCheckouts.length === 0) {
                return res.status(404).json({ message: 'Không tìm thấy thông tin sản phẩm thanh toán của người dùng này.' });
            }
    
            res.status(200).json(dataCheckouts);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Đã xảy ra lỗi khi lấy thông tin thanh toán.' });
        }
    },
     checkoutUser: async (req, res) => {
        try {
            const { userId, products, phoneNumber, address , totalPrice ,methodPayment , status } = req.body;
        
            const newCheckout = new Checkout({
                userId,
                products,
                phoneNumber,
                address,
                totalPrice,
                methodPayment,
                status:"Chờ"
            });
            await newCheckout.save();
            res.status(200).json(newCheckout);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Đã xảy ra lỗi khi thêm sản phẩm vào giỏ hàng.' });
        }
    },
    deleteCheckoutUser: async (req,res)=>{
        try {
            const {id} = req.params;
            const deleteUserCheckout = await Checkout.findByIdAndDelete(id);
            res.status(200).json({ message: "Xóa thành công" });
        } catch (error) {
            res.status(500).json({ message: "Lỗi server" });
        }
    },
    
    // cancelOrder: async (req, res) => {
    //     try {
    //         const { productId } = req.params; 
    //         const order = await Checkout.findOne({ "products._id": productId });
    //         if (!order) {
    //             return res.status(404).json({ message: 'Không tìm thấy đơn hàng chứa sản phẩm này.' });
    //         }
    //         order.products.forEach(product => {
    //             if (product._id.equals(productId)) {
    //                 product.status = "Hủy";
    //             }
    //         });
    //         await order.save();
    //         res.status(200).json({ message: 'Đã hủy sản phẩm thành công.' });
    //     } catch (error) {
    //         console.error(error);
    //         res.status(500).json({ message: 'Đã xảy ra lỗi khi hủy sản phẩm.' });
    //     }
    // }
    
  
}


module.exports = checkoutController;
