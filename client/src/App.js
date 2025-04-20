import React from 'react';
import { Routes, Route } from 'react-router-dom';
import FormContainer from './components/auth/FormContainer';
import OnboardingContainer from './components/onboarding/OnboardingContainer';
import VerifyAccount from './components/auth/verifyAccount';
import "./styles/style.css"

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<FormContainer />} />
                <Route path="/onboarding" element={<OnboardingContainer />} />
                <Route path="/verify-account" element={<VerifyAccount />} />
            </Routes>
        </div>
    );
}

export default App;