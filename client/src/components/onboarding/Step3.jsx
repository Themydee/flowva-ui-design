import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Step3 = ({ email, nextStep, isStep2Complete, className = 'step step3' }) => {
    const [selectedTools, setSelectedTools] = useState([]);
    const [error, setError] = useState('');

    const tools = [
        { name: 'Notion', icon: '📝' },
        { name: 'Trello', icon: '📋' },
        { name: 'Slack', icon: '💬' },
        { name: 'ClickUp', icon: '✅' },
        { name: 'Canva', icon: '🎨' },
        { name: 'Zapier', icon: '⚡' },
        { name: 'Stripe', icon: '💳' },
        { name: 'Figma', icon: '✏️' },
        { name: 'Calendly', icon: '📅' },
    ];

    const saveInput = async (inputData) => {
        try {
            await axios.post('https://flowva-ui.onrender.com/api/onboarding/', {
                email,
                inputData: {
                    ...inputData,
                    currentStep: 'step3', // ✅ Required for step tracking
                },
            });
            console.log('Input saved:', inputData);
        } catch (error) {
            console.error('Error saving input:', error.response?.data || error.message);
        }
    };

    const handleNextStep = () => {
        if (selectedTools.length === 0) {
            setError('Please select at least one tool to continue.');
        } else {
            saveInput({ tools: selectedTools });
            nextStep();
        }
    };

    const toggleTool = (tool) => {
        const updatedTools = selectedTools.includes(tool)
            ? selectedTools.filter((t) => t !== tool)
            : [...selectedTools, tool];
        setSelectedTools(updatedTools);
        setError('');
    };

    useEffect(() => {
        if (!isStep2Complete) {
            setError('');
        }
    }, [isStep2Complete]);

    return (
        <div className={className}>
            <h2>Your Tool Stack</h2>
            <p>Which tools are part of your workflow? We'll pre-load and organize them in your library.</p>

            <div className="tool-grid">
                {tools.map((tool) => (
                    <div
                        key={tool.name}
                        className={`tool-item ${selectedTools.includes(tool.name) ? 'selected' : ''}`}
                        onClick={() => toggleTool(tool.name)}
                    >
                        <span className="tool-icon">{tool.icon}</span>
                        <span className="tool-name">{tool.name}</span>
                    </div>
                ))}
            </div>

            {isStep2Complete && selectedTools.length === 0 && (
                <p className="error-text">{error}</p>
            )}

            <div className="btn-group">
                <button className="btn" onClick={handleNextStep} disabled={selectedTools.length === 0}>
                    Continue
                </button>
            </div>
        </div>
    );
};

export default Step3;
