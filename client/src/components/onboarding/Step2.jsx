import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Step2 = ({ email, nextStep, className = 'step step2' }) => {
    const [country, setCountry] = useState('');
    const [error, setError] = useState(null); // Error state

    // Save input data for the current step (Step 2)
    const saveInput = async (inputData) => {
        try {
            console.log('Sending inputData:', inputData);  // Log the data being sent

            const response = await axios.post('http://localhost:5000/api/onboarding/', {
                email,
                inputData,
            });
            console.log('Input saved:', response.data);  // Log the response
        } catch (error) {
            console.error('Error saving input:', error.response?.data || error.message);
            setError('There was an error saving your data. Please try again.');
        }
    };

    // Handle country change
    const handleCountryChange = (event) => {
        setCountry(event.target.value); // Set the selected country
        setError(null); // Clear error on input change
    };

    // Handle submit (save data for this step)
    const handleSubmit = async () => {
        if (country) {
            await saveInput({ country });
            nextStep(); // Proceed to the next step after saving
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

            {error && <p className="error-text">{error}</p>} {/* Display error message */}

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
