import React, { useState } from 'react';
import axios from 'axios';

const Step2 = ({ userId, nextStep, className = 'step step2' }) => {
    const [country, setCountry] = useState('');

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

    const handleCountryChange = (event) => {
        const selectedCountry = event.target.value;
        setCountry(selectedCountry);
        saveInput({ country: selectedCountry }); // Save the selected country immediately
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
                    onChange={handleCountryChange} // Save on change
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

            <div className="btn-group">
                <button className="btn" onClick={nextStep} disabled={!isValid}>
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