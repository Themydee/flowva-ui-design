import React, { useState } from 'react';

const Step4 = ({ nextStep, className = 'step step4' }) => {
    const [selectedGoals, setSelectedGoals] = useState([]);

    const toggleGoal = (goal) => {
        setSelectedGoals((prev) =>
            prev.includes(goal) ? prev.filter((g) => g !== goal) : [...prev, goal]
        );
    };

    return (
        <div className={className}>
            <h2>What Do You Want to Track or Improve?</h2>
            <p>This helps us personalize your dashboard and features.</p>

            <div className="checkbox-group">
                {['Subscription costs', 'Tool usage & engagement', 'Unused/duplicate tools', 'Personalized tool suggestions'].map((goal) => (
                    <label key={goal} className="checkbox-item">
                        <input
                            type="checkbox"
                            name="goals"
                            value={goal}
                            checked={selectedGoals.includes(goal)}
                            onChange={() => toggleGoal(goal)}
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