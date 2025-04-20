import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const VerifyAccount = () => {
    const navigate = useNavigate();
    const [code, setCode] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!code) {
            setMessage('Please enter the verification code');
            return;
        }
        if (code.length !== 6) {
            setMessage('The verification code must be 6 digits');
            return;
        }
        setMessage('Verifying your account...');
        setTimeout(() => {
            setMessage('Account verified successfully! Redirecting...');
            navigate('/onboarding'); // Redirect to the dashboard or next step
        }, 1500);
    };

    return (
        <div className="auth-form animate-fadeInUp">
            <div className="form-header">
                <div className="logo">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="logo-icon"
                    >
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                    </svg>
                    <span>Flowva</span>
                </div>
            </div>

            <div className="form-title">Verify Your Account</div>

            {message && (
                <div className={`form-message ${message.includes('successfully') ? 'success-message' : 'error-message'}`}>
                    {message}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="verification-code">Enter Verification Code</label>
                    <input
                        type="text"
                        id="verification-code"
                        placeholder="Enter 6-digit code"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        maxLength={6}
                        required
                    />
                </div>

                <button type="submit" className="btn">
                    Verify Account
                </button>
            </form>

            <div className="form-footer">
                Didn't receive a code?{' '}
                <a href="#" onClick={() => setMessage('Resending verification code...')} className="link">
                    Resend Code
                </a>
            </div>
        </div>
    );
};

export default VerifyAccount;