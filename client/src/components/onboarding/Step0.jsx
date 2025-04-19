import React from 'react';

const Step0 = ({ nextStep, className = 'step step0' }) => {
    return (
        <div className={className}>
            <div className="welcome-content">
                <h1>Welcome to Flowva</h1>
                <p>Your smart library for organizing tools, tracking usage, and turning productivity into rewards. Let's set up your digital library in 2 minutes.</p>
            </div>
            <div className="btn-group">
                <button className="btn" onClick={nextStep}>Let's Go</button>
            </div>
        </div>
    );
};

export default Step0;