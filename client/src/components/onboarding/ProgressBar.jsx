import React from 'react';

const ProgressBar = ({ currentStep, totalSteps }) => {
    const progressPercentage = (currentStep / totalSteps) * 100;

    return (
        <div className="progress-bar">
            <div className="progress" style={{ width: `${progressPercentage}%` }}></div>
        </div>
    );
};

export default ProgressBar;