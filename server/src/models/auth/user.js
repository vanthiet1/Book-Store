const mongoose = require("mongoose");
const useSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 50,
        unique: true
    },
    password: {
        type: String,
        minlength: 8,
    },
    googleId: {
        type: String, 
        unique: true,
        sparse: true 
    },
    admin: {
        type: Boolean,
        default: false,
    },
    verificationCode: Number,
    status: {
        type: Boolean,
        default: false
    },
       expiresAt: {
        type: Date,
        required: true
    },
    verificationCount: { 
        type: Number,
         default: 0 
        },
    randomString: {
        type: String
    },
    resetTokenExpires: {
        type: Date,
        default: Date.now() 
    }
},
    { timestamps: true }
);
const User = mongoose.model("User", useSchema)
module.exports = User;