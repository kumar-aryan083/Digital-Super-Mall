import userModel from "../models/user.model.js";
import { comparePassword, hashPassword } from "../utils/hashing.js";
import { generateToken } from "../utils/tokenization.js";

export const userRegister = async(req, res)=>{
    try {
        const existingUser = await userModel.findOne({
            $or: [
                { username: req.body.username },
                { email: req.body.email },
                { phone: req.body.phone }
            ]
        });
        if (existingUser) {
            res.status(400).json({
                success: false,
                message: "User already exists."
            })
        } else {
            const { password, ...others } = req.body;
            const hashedPassword = hashPassword(password);
            const newUser = new userModel({ ...others, password: hashedPassword });
            await newUser.save();
            if (newUser) {
                res.status(200).json({
                    success: true,
                    message: "User created successfully",
                    data: newUser._doc
                });
            } else {
                res.status(404).json({
                    success: false,
                    message: "User not created in db"
                })
            }
        }
    } catch (error) {
        console.log(error);
    }
}
export const userLogin = async(req, res) =>{
    try {
        const user = await userModel.findOne({
            $or: [
                {username: req.body.id},
                {email: req.body.id},
                {phone: req.body.id}
            ]
        });
        if(!user){
            res.status(404).json({
                success: false,
                message: "User with this credentials doesn't exists."
            })
        }else{
            // password validation
            if(comparePassword(req.body.password, user.password)){
                // tokenization
                const token = generateToken(user._id);
                const {password, ...others} = user._doc;
                res.cookie('token', token, {
                    httpOnly: true,
                    sameSite: 'Lax',
                    maxAge: 7 * 24 * 60 * 60 * 1000,
                    secure: process.env.NODE_ENV === 'production'
                }).status(200).json({
                    success: true,
                    message: "Logged in successfully.",
                    data: others,
                    token
                });
            }else{
                res.status(401).json({
                    success: false,
                    message: "Incorrect password."
                })
            }
        }
    } catch (error) {
        console.log(error);
    }
}