import React, { useState } from 'react';
import '../../styles/style.css';

const SignUpForm = ({ toggleForm }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

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
            setMessage('Account created successfully! Welcome to Flowva.');
        }, 1500);
    };

    return (
        <form className="animate-form" onSubmit={handleSubmit}>
            <div className="logo">Flowva</div>
            <div className="welcome">Join Flowva today</div>
            {message && <div className="form-message error-message">{message}</div>}
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
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
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
            <button type="submit" className="btn">Create account</button>
            <div className="form-footer">
                Already have an account? <a href="#" onClick={() => toggleForm('signin')}>Sign in</a>
            </div>
        </form>
    );
};

export default SignUpForm;