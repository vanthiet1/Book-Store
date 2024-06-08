const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
    orderId: {
        type: Number,
        ref: 'Checkout', 
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Payment = mongoose.model('Payment', PaymentSchema);

module.exports = Payment;
