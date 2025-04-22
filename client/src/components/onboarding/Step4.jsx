import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Step4 = ({ email, nextStep, isStep3Complete, className = 'step step4' }) => {
    const [selectedGoals, setSelectedGoals] = useState([]);
    const [error, setError] = useState('');

    const goals = [
        'Subscription costs',
        'Tool usage & engagement',
        'Unused/duplicate tools',
        'Personalized tool suggestions',
    ];

    const saveInput = async (inputData) => {
        try {
            await axios.post('http://localhost:5000/api/onboarding/', {
                email,
                inputData,
            });
            console.log('Input saved:', inputData);
        } catch (error) {
            console.error('Error saving input:', error.response?.data || error.message);
        }
    };

    const handleNextStep = () => {
        if (selectedGoals.length === 0) {
            setError('Please select at least one goal to continue.');
        } else {
            saveInput({ goals: selectedGoals });
            nextStep(); // Proceed to the next step
        }
    };

    const toggleGoal = (goal) => {
        const updatedGoals = selectedGoals.includes(goal)
            ? selectedGoals.filter((g) => g !== goal)
            : [...selectedGoals, goal];
        setSelectedGoals(updatedGoals);
        setError(''); // Clear error when a goal is selected
    };

    useEffect(() => {
        // If Step 3 isn't completed, don't show the error message yet.
        if (!isStep3Complete) {
            setError('');
        }
    }, [isStep3Complete]);

    return (
        <div className={className}>
            <h2>What Do You Want to Track or Improve?</h2>
            <p>This helps us personalize your dashboard and features.</p>

            <div className="checkbox-group">
                {goals.map((goal) => (
                    <label key={goal} className="checkbox-item">
                        <input
                            type="checkbox"
                            name="goals"
                            value={goal}
                            checked={selectedGoals.includes(goal)}
                            onChange={() => toggleGoal(goal)} // Toggle goal selection
                        />
                        {goal}
                    </label>
                ))}
            </div>

            {/* Show error only if no goals are selected and Step 3 is complete */}
            {isStep3Complete && selectedGoals.length === 0 && (
                <p className="error-text">{error}</p>
            )}

            <div className="btn-group">
                <button className="btn" onClick={handleNextStep} disabled={selectedGoals.length === 0}>
                    Continue
                </button>
            </div>
        </div>
    );
};

export default Step4;
