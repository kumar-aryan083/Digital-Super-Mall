import adminModel from "../models/admin.model.js";
import productModel from "../models/product.model.js";
import shopModel from "../models/shop.model.js";
import { comparePassword, hashPassword } from "../utils/hashing.js";
import { generateToken } from "../utils/tokenization.js";
import nodemailer from 'nodemailer';

export const adminRegister = async (req, res) => {
    try {
        const existingAdmin = await adminModel.findOne({
            $or: [
                { username: req.body.username },
                { email: req.body.email },
                { phone: req.body.phone }
            ]
        });
        if (existingAdmin) {
            res.json({
                success: false,
                message: "Admin already exists."
            })
        } else {
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ012345689abcdefghijklmnopqrstuvwxyz';
            let otp = "";
            for (let i = 0; i < 6; i++) {
                const randomIdx = Math.floor(Math.random() * characters.length);
                otp += characters[randomIdx];
            }

            //SENDING OTP TO THE MAIL
            const transporter = nodemailer.createTransport({
                host: 'smtp.hostinger.com',
                port: 465,
                secure: true,
                auth: {
                    user: 'noreply@codesofrohan.com',
                    pass: "B^@LR287@e",
                },
            });

            const mailOptions = {
                from: `"Aryan Srivatava" <noreply@codesofrohan.com>`,
                to: req.body.email,
                cc: '',
                subject: "OTP For Registaration on Digital SuperMall",
                html: `<div style="margin: 0 auto; width: 95%; max-width: 800px; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;">
        <div style="border: 1px solid rgba(0, 0, 0, 0.138); padding:0 20px;">

            <div style="background-color: rgb(84, 84, 250);">
                <h1 style=" color: white;padding: 10px 20px;">Automatically Generated Email (Digital SuperMall)</h1>
            </div>
            <div>
                <p>Thanks for registering with us we are the leading Super Mall website.</p>
                <p>We are delighted to see you onboard.</p>
                <h3>Things to remember:</h3>
                <ul>
                    <li>Don't do non-sense post.</li>
                    <li>Always be attentive while using admin pannel.</li>
                </ul>
                <h3>Repocursions</h3>
                    <ul>
                        <li>You will be Responsible for everything you will do.</li>
                        <li>You will be penalize for any miss-conducts.</li>
                    </ul>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus quasi pariatur, iure, dolor culpa porro sequi architecto reprehenderit totam maiores fugit maxime, odio libero quas? Nisi sapiente totam quam quia!</p>
                    <p>Your One Time Password is: <strong>${otp}</strong></p>
            </div>
        </div>
    </div>`,
            };

            const info = await transporter.sendMail(mailOptions);

            const { password, ...others } = req.body;
            const hashedPassword = hashPassword(password);
            const newAdmin = new adminModel({ ...others, password: hashedPassword, otp });
            await newAdmin.save();
            if (newAdmin) {
                res.json({
                    success: true,
                    message: "OTP sent to email",
                    data: newAdmin._doc
                });
            } else {
                res.json({
                    success: false,
                    message: "Admin not created in db"
                })
            }
        }
    } catch (error) {
        console.log(error);
    }
}
export const adminLogin = async (req, res) => {
    try {
        const admin = await adminModel.findOne({
            $or: [
                { username: req.body.id },
                { email: req.body.id },
                { phone: req.body.id }
            ]
        });
        if (!admin) {
            res.json({
                success: false,
                message: "Admin with this credentials doesn't exists."
            })
        } else {
            // password validation
            if (comparePassword(req.body.password, admin.password)) {
                if (admin.verified) {
                    // tokenization
                    const token = generateToken(admin._id);
                    const { password, ...others } = admin._doc;
                    res.cookie('token', token, {
                        httpOnly: true,
                        sameSite: 'Lax',
                        secure: process.env.NODE_ENV === 'production',
                        maxAge: 7 * 24 * 60 * 60 * 1000
                    }).json({
                        success: true,
                        message: "Logged in successfully.",
                        data: others,
                        token
                    });
                } else {
                    res.json({
                        success: false,
                        message: "Email is not verified."
                    });
                }
            } else {
                res.json({
                    success: false,
                    message: "Incorrect password."
                })
            }
        }
    } catch (error) {
        console.log(error);
    }
}
export const verifyOtp = async (req, res) => {
    try {
        const admin = await adminModel.findOne({ _id: req.params.id });
        if (admin) {
            if (admin.otp === req.body.otp) {
                admin.verified = true;
                await admin.save();
                res.json({
                    success: true,
                    message: 'Email Verified successfully.'
                })
            } else {
                res.json({
                    success: false,
                    message: "Invalid OTP"
                })
            }
        } else {
            res.json({
                success: false,
                message: "Admin couldn't created."
            })
        }
    } catch (error) {
        console.error("Error: ", error);
    }
}
export const createShop = async (req, res) => {
    try {
        // console.log(req.body);
        const shop = await shopModel.findOne({ shopName: req.body.shopName });
        if (shop) {
            res.json({
                success: false,
                message: 'Shop with this name already exists.'
            })
        } else {
            const newShop = new shopModel({ ...req.body, adminId: req.user.id });
            await newShop.save();
            if (newShop) {
                const admin = await adminModel.findById(req.user.id);
                admin.shopIds.push(newShop._id);
                await admin.save();
                res.json({
                    success: true,
                    message: "New shop created."
                })
            } else {
                res.json({
                    success: false,
                    message: 'Unable to create shop'
                })
            }
        }
    } catch (error) {
        console.error(error);
    }
}

export const allShops = async (req, res) => {
    try {
        const shops = await shopModel.find();
        if (shops) {
            return res.json({
                success: true,
                message: "All shops fetched successfully",
                allShops: shops
            })
        } else {
            return res.json({
                success: false,
                message: "Unable to fetch shops",
            })
        }
    } catch (error) {
        console.error(error);
    }
}

export const deleteShop = async (req, res) => {
    try {
        const deleted = await shopModel.findByIdAndDelete(req.params.sId);
        const shops = await shopModel.find();
        if (deleted) {
            return res.json({
                success: true,
                message: 'Shop deleted successfully',
                allShops: shops
            })
        } else {
            return res.json({
                success: false,
                message: 'Unable to delete shop'
            })
        }
    } catch (error) {
        console.log(error);
    }
}

export const updateShop = async(req, res)=>{
    const updated = await shopModel.findOneAndUpdate({_id: req.body._id}, {$set: {...req.body}}, {new: true});
    const shops = await shopModel.find();
    if(updated){
        return res.json({
            success: true,
            message: "Shop details updated.",
            allShops: shops
        })
    }else{
        return res.json({
            success: false,
            message: "Unable to update shop details."
        })
    }
}

export const createProduct = async (req, res) => {
    try {
        // find the shop from shop id
        const shop = await shopModel.findById(req.body.shopId).populate('products');
        if (!shop) {
            return res.json({
                success: false,
                message: 'Product can only be created in a shop.'
            })
        }
        // find if the product is already present in the shop
        const existingProduct = shop.products.find(product => product.productName === req.body.productName);
        if (existingProduct) {
            return res.json({
                success: false,
                message: 'Product with this name already exists in the shop.'
            })
        }
        // create a new product if it's not present in the shop
        const newProduct = new productModel({ ...req.body, adminId: req.user.id });
        await newProduct.save();

        if (newProduct) {
            // push this product to the shop model
            shop.products.push(newProduct._id);
            await shop.save();

            //push this products to admin model
            const admin = await adminModel.findById(req.user.id);
            if (!admin) {
                return res.json({
                    success: false,
                    message: 'Admin not found'
                })
            }
            admin.productIds.push(newProduct._id);
            await admin.save();

            return res.json({
                success: true,
                message: 'New Product added to the shop.',
                newProduct
            })
        } else {
            return res.json({
                success: false,
                message: 'Unable to create new product.'
            })
        }

    } catch (error) {
        console.error(error);
    }
}
