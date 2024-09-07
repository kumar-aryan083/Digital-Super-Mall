import React, { useState } from 'react';
import './styles/Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({role, onLogin, handleAlert}) => {
    const nav = useNavigate();
    const [formData, setFormData] = useState({
        id: "",
        password: ""
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
            const res = await axios.post(`http://localhost:9000/api/${role}/login`, {...formData},{withCredentials: true});
            console.log(res.data);
            localStorage.setItem('user', JSON.stringify(res.data.data));
            onLogin();
            handleAlert(res.data.message);
            nav('/');
        } catch (error) {
            console.log("Login error: ", error);
            handleAlert("Invalid credentials");
        }
    }

    return (
        <>
            <div className="full-login">
                <div className="login-card">
                    <div className="l-card">
                        <div className="ll-card">
                            <div>
                                {role} Login
                            </div>
                            <p>Please signin visit various shops and products in this Digital Super mall.</p>
                        </div>
                        <div className="rl-card">
                            <form onSubmit={handleSubmit}>
                                <input type="text" placeholder='Username, Email, Phone' name='id' value={formData.id} onChange={handleChange} required />
                                <input type="password" placeholder='Password' name='password' value={formData.password} onChange={handleChange} required />
                                <input type="submit" value='Login' />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
