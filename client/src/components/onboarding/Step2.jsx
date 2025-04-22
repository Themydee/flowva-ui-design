import React, { useState } from 'react';
import axios from 'axios';

const Step2 = ({ email, nextStep, className = 'step step2' }) => {
    const [country, setCountry] = useState('');
    const [error, setError] = useState(null);

    const saveInput = async (inputData) => {
        try {
            const response = await axios.post('http://localhost:5000/api/onboarding/', {
                email,
                inputData: {
                    ...inputData,
                    currentStep: 'step2', // ✅ this is required
                },
            });
            console.log('Input saved:', response.data);
        } catch (error) {
            console.error('Error saving input:', error.response?.data || error.message);
            setError('There was an error saving your data. Please try again.');
        }
    };

    const handleCountryChange = (event) => {
        setCountry(event.target.value);
        setError(null);
    };

    const handleSubmit = async () => {
        if (country) {
            await saveInput({ country });
            nextStep();
        } else {
            setError('Please select a country.');
        }
    };

    const isValid = country !== '';

    return (
        <div className={className}>
            <h2>Where Are You Based?</h2>
            <p>This helps us personalize tool suggestions, currencies, and rewards for you.</p>

            <div className="form-group">
                <label htmlFor="country">Country</label>
                <select
                    id="country"
                    name="country"
                    value={country}
                    onChange={handleCountryChange}
                    className="input"
                >
                    <option value="">Select your country</option>
                    <option value="US">United States</option>
                    <option value="GB">United Kingdom</option>
                    <option value="CA">Canada</option>
                    <option value="AU">Australia</option>
                    <option value="IN">India</option>
                    <option value="DE">Germany</option>
                    <option value="FR">France</option>
                    <option value="JP">Japan</option>
                    <option value="BR">Brazil</option>
                    <option value="NG">Nigeria</option>
                </select>
            </div>

            {error && <p className="error-text">{error}</p>}

            <div className="btn-group">
                <button className="btn" onClick={handleSubmit} disabled={!isValid}>
                    Continue
                </button>
                <button className="btn-skip" onClick={nextStep}>
                    Skip this step
                </button>
            </div>
        </div>
    );
};

export default Step2;
