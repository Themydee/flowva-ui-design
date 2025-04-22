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

    // Function to save the selected tools
    const saveInput = async (inputData) => {
        try {
            await axios.post('http://localhost:5000/api/onboarding/', {
                email,
                inputData,
            });
            console.log('Input saved:', inputData);  // Log the data sent
        } catch (error) {
            console.error('Error saving input:', error.response?.data || error.message);
        }
    };

    // Proceed to the next step after saving the selected tools
    const handleNextStep = () => {
        if (selectedTools.length === 0) {
            setError('Please select at least one tool to continue.');  // Show error if no tool is selected
        } else {
            saveInput({ tools: selectedTools });  // Save selected tools
            nextStep();  // Proceed to the next step
        }
    };

    // Toggle the selection of tools
    const toggleTool = (tool) => {
        const updatedTools = selectedTools.includes(tool)
            ? selectedTools.filter((t) => t !== tool)  // Deselect the tool
            : [...selectedTools, tool];  // Add the tool to selected tools
        setSelectedTools(updatedTools);  // Update state
        setError('');  // Clear error when a tool is selected
    };

    // Effect to reset error message if Step 2 is not complete
    useEffect(() => {
        if (!isStep2Complete) {
            setError('');  // Reset error if Step 2 is incomplete
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
                        onClick={() => toggleTool(tool.name)}  // Toggle tool selection
                    >
                        <span className="tool-icon">{tool.icon}</span>
                        <span className="tool-name">{tool.name}</span>
                    </div>
                ))}
            </div>

            {/* Show error message if Step 2 is complete and no tools are selected */}
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
