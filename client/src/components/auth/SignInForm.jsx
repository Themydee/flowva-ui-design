import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaGlobeAmericas } from "react-icons/fa";

const SignInForm = ({ toggleForm }) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email || !password) {
            setMessage('Please fill in all fields');
            return;
        }
        setMessage('Signing in...');
        setTimeout(() => {
            setMessage('Welcome back! Redirecting...');
            navigate('/onboarding');
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
            
            <div className="form-title">Welcome back</div>
            
            {message && (
                <div className="message error-message">
                    {message}
                </div>
            )}

            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>

            <div className="forgot-password">
                <a href="#" onClick={() => toggleForm('forgot')}>
                    Forgot password?
                </a>
            </div>

            <button type="submit" className="btn">
                Sign in
            </button>

            <div className="form-footer">
                Don't have an account?{' '}
                <a href="#" onClick={() => toggleForm('signup')} className="link">
                    Sign up
                </a>
            </div>
        </form>
    );
};

export default SignInForm;