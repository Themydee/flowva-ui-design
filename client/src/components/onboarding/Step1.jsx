import React, { useState } from 'react';

const Step1 = ({ nextStep, className = 'step step1' }) => {
    const [role, setRole] = useState('');
    const [work, setWork] = useState([]);
    const [otherWork, setOtherWork] = useState('');
    const [showError, setShowError] = useState(false);

    const handleRoleChange = (event) => {
        setRole(event.target.value);
        setShowError(false); // Clear error when a role is selected
    };

    const toggleWork = (option) => {
        setWork((prev) =>
            prev.includes(option) ? prev.filter((item) => item !== option) : [...prev, option]
        );
        if (option === 'Other') {
            setOtherWork('');
        }
    };

    const handleNextStep = () => {
        if (!role) {
            setShowError(true); // Show error if no role is selected
        } else {
            nextStep(); // Proceed to the next step if valid
        }
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
                                onChange={(e) => setOtherWork(e.target.value)}
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