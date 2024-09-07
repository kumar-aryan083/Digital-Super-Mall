import adminModel from "../models/admin.model.js";
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
            res.status(400).json({
                success: false,
                message: "Admin already exists."
            })
        } else {
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ012345689abcdefghijklmnopqrstuvwxyz';
            let otp = "";
            for(let i=0; i<6; i++){
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
                res.status(200).json({
                    success: true,
                    message: "Admin created successfully",
                    data: newAdmin._doc
                });
            } else {
                res.status(403).json({
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
export const verifyOtp = async(req, res)=>{
    try {
        const admin = await adminModel.findOne({_id: req.params.id});
        if(admin){
            if(admin.otp === req.body.otp){
                admin.verified = true;
                await admin.save();
                res.status(200).json({
                    success: true,
                    message: 'Email Verified successfully.'
                })
            }else{
                res.status(401).json({
                    success: false,
                    message: "Invalid OTP"
                })
            }
        }else{
            res.status(404).json({
                success: false,
                message: "Admin couldn't created."
            })
        }
    } catch (error) {
        console.error("Error: ",error);
    }
}