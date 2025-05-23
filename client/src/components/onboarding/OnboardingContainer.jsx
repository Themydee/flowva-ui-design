import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Step0 from './Step0';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import Step5 from './Step5';
import ProgressBar from './ProgressBar';
import '../../styles/onboarding.css';

const OnboardingContainer = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [stepsCompleted, setStepsCompleted] = useState([]);
    const [email, setEmail] = useState(null);
    const navigate = useNavigate();
    const totalSteps = 5;

    useEffect(() => {
        // Retrieve email from localStorage
        const storedEmail = localStorage.getItem('email');
        if (storedEmail) {
            setEmail(storedEmail);
        } else {
            console.error('Email is missing. Redirecting to login...');
            navigate('/login'); // Redirect to login if email is missing
        }
    }, [navigate]);

    const nextStep = () => {
        if (currentStep < totalSteps) {
            setStepsCompleted((prev) => [...new Set([...prev, currentStep])]);
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const completeOnboarding = () => {
        console.log('Onboarding completed!');
    };

    const renderStep = () => {
        const stepContent = (() => {
            switch (currentStep) {
                case 0:
                    return <Step0 nextStep={nextStep} email={email} />;
                case 1:
                    return <Step1 nextStep={nextStep} prevStep={prevStep} email={email} />;
                case 2:
                    return <Step2 nextStep={nextStep} prevStep={prevStep} email={email} />;
                case 3:
                    return <Step3 nextStep={nextStep} prevStep={prevStep} email={email} />;
                case 4:
                    return <Step4 nextStep={nextStep} prevStep={prevStep} email={email} />;
                case 5:
                    return <Step5 email={email} completeOnboarding={completeOnboarding} isStep4Complete={stepsCompleted.includes(4)} />;
                default:
                    return null;
            }
        })();

        return React.cloneElement(stepContent, {
            className: `step active`
        });
    };

    return (
        <div className="onboarding-container">
            <ProgressBar currentStep={currentStep} totalSteps={totalSteps} stepsCompleted={stepsCompleted} />
            {renderStep()}
        </div>
    );
};

export default OnboardingContainer;
