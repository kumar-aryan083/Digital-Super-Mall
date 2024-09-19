import categoryModel from "../models/category.model.js"

export const allCat = async (req, res) => {
    try {
        const categories = await categoryModel.find();
        if (categories) {
            res.json({
                success: true,
                message: 'All categories fetched.',
                categories
            })
        } else {
            res.json({
                success: false,
                message: "Unable to fetch categories"
            })
        }
    } catch (error) {
        console.log(error);
    }
}

export const createCat = async (req, res) => {
    try {
        const cat = await categoryModel.findOne({ catName: req.params.catName });
        if (cat) {
            res.json({
                success: false,
                message: 'Category with this name already exists.',
            })
        } else {
            const newCat = new categoryModel({ catName: req.params.catName });
            await newCat.save();
            if (!newCat) {
                res.json({
                    success: false,
                    message: 'Unable to create new category'
                })
            } else {
                res.json({
                    success: true,
                    message: 'New category created.',
                    newCat
                })
            }
        }
    } catch (error) {
        console.log(error);
    }
}

export const allShops = async (req, res) => {
    try {
        const category = await categoryModel.findOne({ _id: req.params.catId }).populate('shops');
        const shops = category.shops;
        if (category) {
            return res.json({
                success: true,
                message: 'All shops fetched.',
                shops
            })
        } else {
            return res.json({
                success: false,
                message: 'Unable to fecth shops'
            })
        }
    } catch (error) {
        console.log(error);
    }
}
export const deleteCat = async (req, res) => {
    try {
        const deleted = await categoryModel.findByIdAndDelete(req.params.catId);
        if (deleted) {
            return res.json({
                success: true,
                message: 'Category deleted.',
                deleted
            })
        } else {
            return res.json({
                success: false,
                message: 'Unable to delete category'
            })
        }
    } catch (error) {
        console.log(error);
    }
}

export const updateCat = async(req, res)=>{
    try {
        const cat = await categoryModel.findByIdAndUpdate(req.params.catId, {$set: {catName: req.body.catName}}, {new: true});
        if(cat){
            return res.json({
                success: true,
                message: "Category updated.",
                cat
            })
        }else{
            return res.json({
                success: false,
                message :'Unable to update category.'
            })
        }
    } catch (error) {
        console.log(error);
    }
}