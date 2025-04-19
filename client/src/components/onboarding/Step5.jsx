import React, { useState } from 'react';

const Step5 = ({ className = 'step step5' }) => {
    const [showPopup, setShowPopup] = useState(false);

    const handleGoToDashboard = () => {
        setShowPopup(true);
    
        setTimeout(() => {
            
            console.log('Redirecting to dashboard...');
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