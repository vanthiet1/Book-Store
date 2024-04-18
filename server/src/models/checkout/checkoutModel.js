const mongoose = require('mongoose');
const checkoutSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                default: 1
            },
             imgBook:{
                type:String,
                required: true
             },
             name:{
                type:String,
                required: true
             },
             price:{
                type:Number,
                required: true
             },
             dateCheckout: {
                type: Date,
                default: Date.now
            }
             
        }
    ],
    totalPrice: {
        type: Number,
        required: true,
        default: 0
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    methodPayment: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['Chờ', 'Trả Hàng', 'Hủy Bỏ' , 'Thành Công'], 
        default: 'Chờ'
    },
   
});

const Checkout = mongoose.model('Checkout', checkoutSchema);
module.exports = Checkout;