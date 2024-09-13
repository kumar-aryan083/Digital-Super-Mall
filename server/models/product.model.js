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
    shopId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Shop'
    },
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin'
    }
});

export default mongoose.model('Product', productSchema);