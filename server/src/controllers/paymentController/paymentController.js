const PayOS = require("@payos/node");
const Checkout = require('../../models/checkout/checkoutModel');
const payOS = new PayOS("0927adba-dcf3-4b7f-bc96-5b7ec3354428", "95bcee01-b826-4b29-91d6-077d17a896f8", "7db4e8301a3f9910de81505aaa0518218e72812af7176945e19bfaaf51baa65b");
const mongoose = require('mongoose')
const checkoutController = {
    paymentUser: async (req, res) => {
        try {
            const orderData = req.body;
            const userId = mongoose.Types.ObjectId(orderData)
            const checkout = await Checkout.findById({userId:userId});
            if (!checkout) {
                return res.status(404).json({ error: "Checkout not found" });
            }
            console.log(checkout);
        
            const order = await payOS.createPaymentLink({
                orderCode: 123, 
                amount: checkout.totalPrice, 
                description: "Thanh Toán Đơn Hàng",
                items:[{
                    userId:checkout.userId,
                    totalPrice:checkout.totalPrice,          
                    phoneNumber:checkout.phoneNumber,
                    address:checkout.address,
                    methodPayment:checkout.methodPayment        
                }],
                returnUrl: "http://localhost:1000",
                cancelUrl: "http://localhost:1000"
            });
            console.log(order);
            const paymentLink = await payOS.createPaymentLink(order)
            console.log(paymentLink);
            
            res.json(paymentLink);
        } catch (error) {
            console.error("Error creating payment link:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
};

module.exports = checkoutController;