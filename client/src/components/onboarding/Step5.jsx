import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Step5 = ({ email, isStep4Complete, className = 'step step5' }) => {
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const completeOnboarding = async () => {
        try {
            console.log('Sending email:', email);
            console.log('Sending inputData:', { isCompleted: true });

            const response = await axios.post('http://localhost:5000/api/onboarding/', {
                email,
                inputData: { isCompleted: true },
            });
            console.log('Onboarding marked as complete:', response.data);
        } catch (error) {
            console.error('Error completing onboarding:', error.response?.data || error.message);
        }
    };

    const handleGoToDashboard = async () => {
        if (!isStep4Complete) {
            setError('Please complete all steps before proceeding.');
            return;
        }

        setShowPopup(true);

        // Save onboarding completion before navigating
        await completeOnboarding();

        // After 2 seconds, navigate to the dashboard
        setTimeout(() => {
            navigate('/dashboard');
        }, 2000);
    };

    const closePopup = () => {
        setShowPopup(false);
    };

    useEffect(() => {
        // Clear error when Step 4 is completed
        if (isStep4Complete) {
            setError('');
        }
    }, [isStep4Complete]);

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

            {/* Show error if Step 4 is not completed */}
            {error && <p className="error-text">{error}</p>}
        </div>
    );
};

export default Step5;
