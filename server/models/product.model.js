import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    mrp: {
        type: Number,
        required: true
    },
    shopIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Shop'
    }]
});

export default mongoose.model('Product', productSchema);