import React, { useState } from 'react';

const Step2 = ({ nextStep, className = 'step step2' }) => {
    const [country, setCountry] = useState('');

    const handleCountryChange = (event) => {
        setCountry(event.target.value);
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