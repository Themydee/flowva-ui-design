import React, { useState } from 'react';
import axios from 'axios';

const Step3 = ({ userId, nextStep, className = 'step step3' }) => {
    const [selectedTools, setSelectedTools] = useState([]);

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
            await axios.post('http://localhost:5000/api/onboarding', {
                userId,
                inputData,
            });
            console.log('Input saved:', inputData);
        } catch (error) {
            console.error('Error saving input:', error.response?.data || error.message);
        }
    };

    const toggleTool = (tool) => {
        const updatedTools = selectedTools.includes(tool)
            ? selectedTools.filter((t) => t !== tool)
            : [...selectedTools, tool];
        setSelectedTools(updatedTools);
        saveInput({ tools: updatedTools }); // Save the updated tools immediately
    };

    return (
        <div className={className}>
            <h2>Your Tool Stack</h2>
            <p>Which tools are part of your workflow? We'll pre-load and organize them in your library.</p>

            <div className="tool-grid">
                {tools.map((tool) => (
                    <div
                        key={tool.name}
                        className={`tool-item ${selectedTools.includes(tool.name) ? 'selected' : ''}`}
                        onClick={() => toggleTool(tool.name)} // Save on toggle
                    >
                        <span className="tool-icon">{tool.icon}</span>
                        <span className="tool-name">{tool.name}</span>
                    </div>
                ))}
            </div>

            <div className="btn-group">
                <button className="btn" onClick={nextStep}>
                    Continue
                </button>
            </div>
        </div>
    );
};

export default Step3;