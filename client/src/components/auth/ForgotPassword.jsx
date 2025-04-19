import React, { useState } from 'react';
import { FaGlobeAmericas } from "react-icons/fa";

const ForgotPassword = ({ toggleForm }) => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email) {
            setMessage('Please enter your email');
            return;
        }
        setMessage('Sending reset link...');
        setTimeout(() => {
            setMessage('Reset link sent to your email');
        }, 1500);
    };

    return (
        <form onSubmit={handleSubmit} className="auth-form animate-fadeInUp">
            <div className="form-header">
                <div className="logo">
                    <FaGlobeAmericas className="logo-icon" /> 
                    <span>Flowva</span>
                </div>
            </div>

            <div className="form-title">Reset your password</div>

            {message && (
                <div className="message error-message">
                    {message}
                </div>
            )}

            <div className="form-group">
                <label htmlFor="forgot-email">Email</label>
                <input
                    type="email"
                    id="forgot-email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>

            <button type="submit" className="btn">
                Send reset link
            </button>

            <div className="form-footer">
                Remember your password?{' '}
                <a href="#" onClick={() => toggleForm('signin')} className="link">
                    Sign in
                </a>
            </div>
        </form>
    );
};

export default ForgotPassword;