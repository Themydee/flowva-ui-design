import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Step5 = ({ email, completeOnboarding, isStep4Complete, className = 'step step5' }) => {
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const completeOnboardingProcess = async () => {
        try {
            console.log('Sending email:', email);
            console.log('Sending inputData:', { isCompleted: true, currentStep: 'step5' });

            const response = await axios.post('https://flowva-ui.onrender.com/api/onboarding/', {
                email,
                inputData: { isCompleted: true, currentStep: 'step5' },
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
        await completeOnboardingProcess();

        setTimeout(() => {
            navigate('/dashboard');
        }, 2000);
    };

    const closePopup = () => {
        setShowPopup(false);
    };

    useEffect(() => {
        if (isStep4Complete) {
            setError('');
        }
    }, [isStep4Complete]);

    return (
        <div className={className}>
            <h2>Setup Complete!</h2>
            <p>Your Flowva library is ready to use. We'll take you to your dashboard now where you can start organizing your tools and tracking your productivity.</p>

            <div className="btn-group">
                <button className="btn" onClick={handleGoToDashboard} disabled={!isStep4Complete}>
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

            {error && <p className="error-text">{error}</p>}
        </div>
    );
};

export default Step5;

