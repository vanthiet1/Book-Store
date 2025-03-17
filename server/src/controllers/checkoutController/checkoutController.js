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
    
    deleteCheckoutUser: async (req, res) => {
        try {
            const { id } = req.params;
            await Checkout.findByIdAndDelete(id);
            res.status(200).json({ message: "Xóa thành công" });
        } catch (error) {
            res.status(500).json({ message: "Lỗi server" });
        }
    },

    updateOrderCheckout: async (req, res) => {
        try {
            const {id} = req.params;
            if (!id) {
                return res.status(404).json({ message: "id order not found" });
            }
            const updatedOrderCheckout = await Checkout.findByIdAndUpdate(
                id,
                { status:true },
                { new: true }
            );
            if (!updatedOrderCheckout) {
                return { success: false, message: 'Không tim thấy đơn hàng' };
            }
            res.status(200).json(updatedOrderCheckout)
        } catch (error) {
            res.status(500).json({ message: "lỗi server" })
        }
    },
    
    cancelOrderCheckout: async (req, res) => {
        try {
            const {id} = req.params;
            if (!id) {
                return res.status(404).json({ message: "id order not found" });
            }
            const updatedOrderCheckout = await Checkout.findByIdAndUpdate(
                id,
                { status:false },
                { new: true }
            );
            if (!updatedOrderCheckout) {
                return { success: false, message: 'Không tim thấy đơn hàng' };
            }
            res.status(200).json(updatedOrderCheckout)
        } catch (error) {
            res.status(500).json({ message: "lỗi server" })
        }
    },

     checkoutUser: async (req, res) => {
        try {
            const { userId, products, phoneNumber, address, totalPrice, methodPayment } = req.body;
            const objectIdUserId = new mongoose.Types.ObjectId(userId);
            const newCheckout = new Checkout({
                userId:objectIdUserId,
                products,
                phoneNumber,
                address,
                totalPrice,
                methodPayment,
            });
            await newCheckout.save();
            res.status(200).json(newCheckout);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Đã xảy ra lỗi khi thêm sản phẩm vào giỏ hàng.' });
        }
    },

   

}


module.exports = checkoutController;
