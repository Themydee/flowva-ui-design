import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Step5 = ({ userId, className = 'step step5' }) => {
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();

    const completeOnboarding = async () => {
        try {
            await axios.post('http://localhost:5000/api/onboarding', {
                userId,
                inputData: { isCompleted: true }, // Mark onboarding as completed
            });
            console.log('Onboarding marked as complete');
        } catch (error) {
            console.error('Error completing onboarding:', error.response?.data || error.message);
        }
    };

    const handleGoToDashboard = () => {
        setShowPopup(true);

        // Save onboarding completion and redirect to dashboard
        completeOnboarding();

        setTimeout(() => {
            navigate('/dashboard'); // Redirect to the dashboard
        }, 2000);
    };

    const closePopup = () => {
        setShowPopup(false);
    };

    return (
        <div className={className}>
            <h2>Setup Complete!</h2>
            <p>Your Flowva library is ready to use. We'll take you to your dashboard now where you can start organizing your tools and tracking your productivity.</p>

            <div className="btn-group">
                <button className="btn" onClick={handleGoToDashboard}>
                    Go to Dashboard
                </button>
            </div>

            {showPopup && (
                <div className="overlay">
                    <div className="completion-popup">
                        <h2>Onboarding Complete!</h2>
                        <p>Taking you to your dashboard now...</p>
                        <button className="btn" onClick={closePopup}>
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Step5;