import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
    catName: {
        type: String,
        required: true
    },
    shops: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Shop'
    }]
});

export default mongoose.model('Category', categorySchema);