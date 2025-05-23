import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaGlobeAmericas } from "react-icons/fa";
import { PiSignInBold } from "react-icons/pi";
import axios from 'axios';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

// Firebase imports
import { auth, provider } from '../firebase'; // Adjust path as needed

const SignInForm = ({ toggleForm }) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            setMessage('Please fill in all fields');
            setIsSuccess(false);
            return;
        }

        try {
            setMessage('Signing you in...');
            setIsSuccess(false);

            const response = await axios.post("https://backend-flowva.onrender.com/api/auth/login", {
                email,
                password,
            });

            localStorage.setItem('email', response.data.user.email);

            setMessage(response.data.message || 'Welcome back! Redirecting...');
            setIsSuccess(true);
            setTimeout(() => {
                navigate('/onboarding');
            }, 1500);
        } catch (error) {
            setMessage(error.response?.data?.message || 'Sign-in failed. Please try again.');
            setIsSuccess(false);
        }
    };

        const googleLogin = () => {
            const provider = new GoogleAuthProvider();
            signInWithPopup(auth, provider).then(async (result) => {
                const user = result.user;
            
                localStorage.setItem('email', user.email); // Store Google email in localStorage
    
                setMessage('Google login successful!');
                setIsSuccess(true);
    
                setTimeout(() => {
                    navigate('/onboarding'); // Redirect to the onboarding page after Google login
                }, 1000);
            }).catch((error) => {
                setMessage(error.message || 'Google login failed');
                setIsSuccess(false);
            });
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
                <div className={`message ${isSuccess ? 'success-message' : 'error-message'}`}>
                    {message}
                </div>
            )}

            <div className="form-group">
                <label htmlFor="signin-email">Email</label>
                <input
                    type="email"
                    id="signin-email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="signin-password">Password</label>
                <input
                    type="password"
                    id="signin-password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>

            <button type="submit" className="btn">
                <PiSignInBold style={{ marginRight: '5px' }} />
                Sign in
            </button>

            <div className="divider">or continue with</div>

            <button type="button" className="btn btn-secondary" onClick={googleLogin}>
                <svg width="18" height="18" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                Google
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
