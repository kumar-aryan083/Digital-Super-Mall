import mongoose from "mongoose";

const adminSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    otp: String,
    verified: {
        type: Boolean,
        default: false
    },
    shopIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Shop'
    }]
});

export default mongoose.model('Admin', adminSchema);