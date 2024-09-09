import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    specs: {
        type: String,
        required: true
    },
    mrp: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        default: 0
    },
    offerPerc: {
        type: Number,
        default: 0
    },
    productImg: {
        type: String,
        required: true
    },
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin',
        unique: true
    }
});

export default mongoose.model('Product', productSchema);