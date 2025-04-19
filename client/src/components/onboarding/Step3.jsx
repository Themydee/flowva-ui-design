import React, { useState } from 'react';

const Step3 = ({ nextStep, className = 'step step3' }) => {
    const [selectedTools, setSelectedTools] = useState([]);

    const toggleTool = (tool) => {
        setSelectedTools((prev) =>
            prev.includes(tool) ? prev.filter((t) => t !== tool) : [...prev, tool]
        );
    };

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

            <div className="btn-group">
                <button className="btn" onClick={nextStep}>
                    Continue
                </button>
            </div>
        </div>
    );
};

export default Step3;