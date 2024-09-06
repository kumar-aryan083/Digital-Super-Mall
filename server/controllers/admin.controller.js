import adminModel from "../models/admin.model.js";
import { comparePassword, hashPassword } from "../utils/hashing.js";
import { generateToken } from "../utils/tokenization.js";

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
            res.status(400).json({
                success: false,
                message: "Admin already exists."
            })
        } else {
            const { password, ...others } = req.body;
            const hashedPassword = hashPassword(password);
            const newAdmin = new adminModel({ ...others, password: hashedPassword });
            await newAdmin.save();
            if (newAdmin) {
                res.status(200).json({
                    success: true,
                    message: "Admin created successfully",
                    data: newAdmin._doc
                });
            } else {
                res.status(404).json({
                    success: false,
                    message: "Admin not created in db"
                })
            }
        }
    } catch (error) {
        console.log(error);
    }
}
export const adminLogin = async(req, res) => {
    try {
        const admin = await adminModel.findOne({
            $or: [
                {username: req.body.id},
                {email: req.body.id},
                {phone: req.body.id}
            ]
        });
        if(!admin){
            res.status(404).json({
                success: false,
                message: "Admin with this credentials doesn't exists."
            })
        }else{
            // password validation
            if(comparePassword(req.body.password, admin.password)){
                // tokenization
                const token = generateToken(admin._id);
                const {password, ...others} = admin._doc;
                res.cookie('token', token, {httpOnly: true}).status(200).json({
                    success: true,
                    message: "Logged in successfully.",
                    data: others,
                    token
                });
            }else{
                res.status(401).json({
                    succes: false,
                    message: "Incorrect password."
                })
            }
        }
    } catch (error) {
        console.log(error);
    }
}