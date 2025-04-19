import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaGlobeAmericas } from "react-icons/fa";
import zxcvbn from 'zxcvbn';

const SignUpForm = ({ toggleForm }) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [passwordStrength, setPasswordStrength] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email || !password || !confirmPassword) {
            setMessage('Please fill in all fields');
            return;
        }
        if (password !== confirmPassword) {
            setMessage('Passwords do not match');
            return;
        }
        if (password.length < 8) {
            setMessage('Password must be at least 8 characters');
            return;
        }
        setMessage('Creating your account...');
        setTimeout(() => {
            setMessage('Account created successfully! Redirecting...');
            navigate('/onboarding');
        }, 1500);
    };

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        const strength = zxcvbn(newPassword);
        setPasswordStrength(strength);
    };

    return (
        <form onSubmit={handleSubmit} className="auth-form animate-fadeInUp">
            <div className="form-header">
                <div className="logo">
                    <FaGlobeAmericas className="logo-icon" /> 
                    <span>Flowva</span>
                </div>
            </div>
            
            <div className="form-title">Join Flowva today</div>
            
            {message && (
                <div className="message error-message">
                    {message}
                </div>
            )}

            <div className="form-group">
                <label htmlFor="signup-email">Email</label>
                <input
                    type="email"
                    id="signup-email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="signup-password">Password</label>
                <input
                    type="password"
                    id="signup-password"
                    placeholder="••••••••"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                />
                {passwordStrength && (
                    <div className="password-strength-meter">
                        <div className="strength-bar">
                            <div 
                                className={`strength-indicator ${
                                    passwordStrength.score >= 3 
                                        ? 'strong' 
                                        : passwordStrength.score === 2 
                                        ? 'medium' 
                                        : 'weak'
                                }`}
                            ></div>
                        </div>
                        <p className="strength-text">
                            {['Weak', 'Weak', 'Medium', 'Strong', 'Very Strong'][passwordStrength.score]}
                        </p>
                    </div>
                )}
            </div>

            <div className="form-group">
                <label htmlFor="confirm-password">Confirm Password</label>
                <input
                    type="password"
                    id="confirm-password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
            </div>

            <button type="submit" className="btn">
                Create account
            </button>

            <div className="form-footer">
                Already have an account?{' '}
                <a href="#" onClick={() => toggleForm('signin')} className="link">
                    Sign in
                </a>
            </div>
        </form>
    );
};

export default SignUpForm;