import React, { useState } from 'react';
import axios from 'axios';

const Step4 = ({ userId, nextStep, className = 'step step4' }) => {
    const [selectedGoals, setSelectedGoals] = useState([]);

    const saveInput = async (inputData) => {
        try {
            await axios.post('http://localhost:5000/api/onboarding', {
                userId,
                inputData,
            });
            console.log('Input saved:', inputData);
        } catch (error) {
            console.error('Error saving input:', error.response?.data || error.message);
        }
    };

    const toggleGoal = (goal) => {
        const updatedGoals = selectedGoals.includes(goal)
            ? selectedGoals.filter((g) => g !== goal)
            : [...selectedGoals, goal];
        setSelectedGoals(updatedGoals);
        saveInput({ goals: updatedGoals }); // Save the updated goals immediately
    };

    return (
        <div className={className}>
            <h2>What Do You Want to Track or Improve?</h2>
            <p>This helps us personalize your dashboard and features.</p>

            <div className="checkbox-group">
                {[
                    'Subscription costs',
                    'Tool usage & engagement',
                    'Unused/duplicate tools',
                    'Personalized tool suggestions',
                ].map((goal) => (
                    <label key={goal} className="checkbox-item">
                        <input
                            type="checkbox"
                            name="goals"
                            value={goal}
                            checked={selectedGoals.includes(goal)}
                            onChange={() => toggleGoal(goal)} // Save on toggle
                        />
                        {goal}
                    </label>
                ))}
            </div>

            <div className="btn-group">
                <button className="btn" onClick={nextStep} disabled={selectedGoals.length === 0}>
                    Continue
                </button>
            </div>
        </div>
    );
};

export default Step4;