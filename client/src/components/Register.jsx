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
                // console.log(res.data);
                handleAlert(res.data.message);
                nav(`/${role}/login`);
            }else{
                handleAlert("Password doesn't match");
            }
        } catch (error) {
            console.error("Error: ", error);
            handleAlert("Error occured while registering")
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
            </div>
        </>
    );
}

export default Register;
