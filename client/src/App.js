import React from 'react';
import { Routes, Route } from 'react-router-dom';
import FormContainer from './components/auth/FormContainer';
import OnboardingContainer from './components/onboarding/OnboardingContainer';
import "./styles/style.css"

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<FormContainer />} />
                <Route path="/onboarding" element={<OnboardingContainer />} />
            </Routes>
        </div>
    );
}

export default App;