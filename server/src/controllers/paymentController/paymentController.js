const Payment = require('../../models/payment/paymentModel');
const Checkout = require('../../models/checkout/checkoutModel');
const PayOS = require("@payos/node");
const payOS = new PayOS("0927adba-dcf3-4b7f-bc96-5b7ec3354428", "95bcee01-b826-4b29-91d6-077d17a896f8", "7db4e8301a3f9910de81505aaa0518218e72812af7176945e19bfaaf51baa65b");


const checkoutController = {
    paymentUser: async (req, res) => {
        try {
            const orderData = req.body;
            const checkoutId = orderData.orderId;
            const checkout = await Checkout.findById(checkoutId);
            if (!checkout) {
                return res.status(404).json({ error: "Checkout not found" });
            }
            // Tạo một bản ghi Payment mới
            const newPayment = new Payment({
                orderId: checkoutId,
            });
            await newPayment.save();

            const order = await payOS.createPaymentLink({
                orderCode: checkoutId, 
                amount: checkout.totalPrice, 
                returnUrl: "http://localhost:1000",
                cancelUrl: "http://localhost:1000",
                description: "Thanh Toán Đơn Hàng"
            });
            const paymentLink = await payOS.createPaymentLink(order)
            console.log(paymentLink);
            await newPayment.save();
            res.json(paymentLink);
        } catch (error) {
            console.error("Error creating payment link:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
};

module.exports = checkoutController;