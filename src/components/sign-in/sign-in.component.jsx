import React, { useState } from 'react';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import './sign-in.styles.scss';

const SignIn = () => {
    const [inputValues, setInputValues] = useState({ email: '', password: '' });
    const handleSubmit = (e) => {
        e.preventDefault();
        setInputValues({ email: '', password: '' });
    }
    const handleChange = (e) => {
        const { value, name } = e.target;
        setInputValues(old => ({ ...old, [name]: value }))
    }
    return (
        <div className='sign-in' >
            <h2>I already have an account</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    handleChange={handleChange}
                    type="email"
                    name='email'
                    label='Email'
                    value={inputValues['email']}
                    required />

                <FormInput
                    type="password"
                    name='password'
                    label='Password'
                    value={inputValues['password']}
                    onChange={handleChange}
                    required
                />
                <CustomButton type="submit">Sign In</CustomButton>
              </form>
        </div>
    );
};

export default SignIn;
