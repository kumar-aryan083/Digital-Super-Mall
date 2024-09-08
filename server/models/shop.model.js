import mongoose from "mongoose";

const shopSchema = mongoose.Schema({
    shopNumber: {
        type: Number,
        unique: true
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    floor: {
        type: Number,
        required: true
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }],
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin',
        required: true
    },
});

shopSchema.pre('save', async function(next){
    const shop = this;
    if(shop.isNew){
        try {
            // find the shop with highest shop number
            const lastShop = await mongoose.models.Shop.findOne({}, {}, {sort: {shopNumber: -1}});
            // If a shop exists, increment the highest shopNumber, otherwise start from 1
            shop.shopNumber = lastShop ? lastShop.shopNumber+1 : 1;
            next();
        } catch (error) {
            next(error)
        }
    }else{
        next();
    }
})

export default mongoose.model('Shop', shopSchema);