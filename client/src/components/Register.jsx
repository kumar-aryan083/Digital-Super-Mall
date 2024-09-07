import React, { useState } from 'react';
import './styles/Register.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = ({role, handleAlert}) => {
    const nav = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        username: "",
        email: "",
        phone: "",
        password: "",
        cnfPassword: ""
    });
    const [otp, setOtp] = useState("");
    const [id, setId] = useState("");

    const handleChange = (e)=>{
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();
        try {
            if(formData.password === formData.cnfPassword){
                const res = await axios.post(`http://localhost:9000/api/${role}/register`, {...formData});
                console.log(res.data);
                if(role === 'admin'){
                    setId(res.data.data._id)
                    handleAlert('OTP sent to email');
                    document.querySelector('.otp-popup').style.display = 'flex';
                }else{
                    handleAlert(res.data.message);
                    nav('/user/login')
                }
            }else{
                handleAlert("Password doesn't match");
            }
        } catch (error) {
            console.error("Error: ", error);
            handleAlert("Admin already exists.")
        }
    }

    const handleOtpChange = (e)=>{
        setOtp(e.target.value);
    }
    
    const handleOtpSubmit = async(e)=>{
        e.preventDefault();
        const res = await  axios.post(`http://localhost:9000/api/admin/verify-otp/${id}`, {otp});
        if(res.data.success){
            handleAlert(res.data.message);
            nav('/admin/login');
        }else{
            handleAlert(res.data.message);
        }
    }

    return (
        <>
            <div className="full-register">
                <div className="register-card">
                    <div className="l-cards">
                        <div className="lr-card">
                            <div>
                                {role} Registration
                            </div>
                            <p>Please signup to Join us and visit various shops, products and offers in this Digital Super mall, an experience of a super mall at home</p>
                        </div>
                        <div className="rr-card">
                            <form onSubmit={handleSubmit}>
                                <input type="text" placeholder='Full Name' name='name' value={formData.name} onChange={handleChange} required />
                                <input type="text" placeholder='Username' name='username' value={formData.username} onChange={handleChange} required />
                                <input type="email" placeholder='Email' name='email' value={formData.email} onChange={handleChange} required />
                                <input type="text" placeholder='Phone' name='phone' value={formData.phone} onChange={handleChange} required />
                                <input type="password" placeholder='Password' name='password' value={formData.password} onChange={handleChange} required />
                                <input type="password" placeholder='Confirm Password' name='cnfPassword' value={formData.cnfPassword} onChange={handleChange} required />
                                <input type="submit" value='Register' />
                            </form>
                        </div>
                    </div>
                </div>
                <div className="otp-popup">
                    <div className="op-card">
                        <h2>Enter OTP: </h2>
                        <form onSubmit={handleOtpSubmit}>
                            <input type="text" name="otp" placeholder='Enter otp here' value={otp} onChange={handleOtpChange}  />
                            <input type="submit" value='Submit OTP' />
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Register;
