import React, { useState } from 'react';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
import ForgotPassword from './ForgotPassword';

const FormContainer = () => {
    const [currentForm, setCurrentForm] = useState('signin');

    const toggleForm = (formName) => {
        setCurrentForm(formName);
    };

    return (
        <div className="container">
            {currentForm === 'signin' && <SignInForm toggleForm={toggleForm} />}
            {currentForm === 'signup' && <SignUpForm toggleForm={toggleForm} />}
            {currentForm === 'forgot' && <ForgotPassword toggleForm={toggleForm} />}
        </div>
    );
};

export default FormContainer;