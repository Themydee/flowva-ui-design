import React, { useState } from 'react';
import axios from 'axios';

const Step1 = ({ email, nextStep, className = 'step step1' }) => {
    const [role, setRole] = useState('');
    const [work, setWork] = useState([]);
    const [otherWork, setOtherWork] = useState('');
    const [showError, setShowError] = useState(false);

    const saveInput = async (inputData) => {
        try {
            await axios.post('https://flowva-ui.onrender.com/api/onboarding/', {
                email,
                inputData: {
                    ...inputData,
                    currentStep: 'step1', // ✅ CRITICAL
                },
            });
            console.log('Input saved:', inputData);
        } catch (error) {
            console.error('Error saving input:', error.response?.data || error.message);
        }
    };

    const handleRoleChange = (event) => {
        const selectedRole = event.target.value;
        setRole(selectedRole);
        setShowError(false);
    };

    const toggleWork = (option) => {
        const updatedWork = work.includes(option)
            ? work.filter((item) => item !== option)
            : [...work, option];
        setWork(updatedWork);
        if (option === 'Other') setOtherWork('');
    };

    const handleOtherWorkChange = (event) => {
        setOtherWork(event.target.value);
    };

    const handleNextStep = async () => {
        if (!role) {
            setShowError(true);
            return;
        }

        const inputData = {
            role,
            work,
            otherWork: work.includes('Other') ? otherWork : '',
        };

        await saveInput(inputData);
        nextStep();
    };

    const isValid = role && (work.length > 0 || otherWork);

    return (
        <div className={className}>
            <h2>About You</h2>
            <p>Help us tailor your library by telling us a bit about yourself.</p>

            <div className="checkbox-group">
                <label>What best describes you?</label>
                <div className="radio-group">
                    {['Freelancer', 'Solo entrepreneur', 'Small team', 'Creator'].map((option) => (
                        <label key={option} className="radio-item">
                            <input
                                type="radio"
                                name="role"
                                value={option}
                                checked={role === option}
                                onChange={handleRoleChange}
                            />
                            {option}
                        </label>
                    ))}
                </div>
                {showError && <p className="error-text">Please select an option.</p>}
            </div>

            <div className="checkbox-group">
                <label>What kind of work do you do?</label>
                <div className="checkbox-group">
                    {['Design', 'Development', 'Writing', 'Marketing', 'Other'].map((option) => (
                        <label key={option} className="checkbox-item">
                            <input
                                type="checkbox"
                                name="work"
                                value={option}
                                checked={work.includes(option)}
                                onChange={() => toggleWork(option)}
                            />
                            <span className="label-text">{option}</span>
                        </label>
                    ))}
                    {work.includes('Other') && (
                        <div className="form-group">
                            <input
                                type="text"
                                placeholder="Please specify"
                                value={otherWork}
                                onChange={handleOtherWorkChange}
                                className="input"
                            />
                        </div>
                    )}
                </div>
            </div>

            <div className="btn-group">
                <button className="btn" onClick={handleNextStep} disabled={!isValid}>
                    Continue
                </button>
            </div>
        </div>
    );
};

export default Step1;
