import React from 'react';
import './styles/Register.css';

const Register = ({role}) => {
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
                            <form>
                                <input type="text" placeholder='Full Name' required />
                                <input type="text" placeholder='Username' required />
                                <input type="email" placeholder='Email' required />
                                <input type="text" placeholder='Phone' required />
                                <input type="password" placeholder='Password' required />
                                <input type="password" placeholder='Confirm Password' required />
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
