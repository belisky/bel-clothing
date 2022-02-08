import React, { useState } from 'react';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import './sign-in.styles.scss';
import { signInWithGoogle,auth } from '../../config/firebase.config';
import { signInWithEmailAndPassword } from 'firebase/auth';

const SignIn = () => {
    const [inputValues, setInputValues] = useState({ email: '', password: '' });
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = inputValues;

        try {
            signInWithEmailAndPassword(auth, email, password);
            setInputValues({ email: '', password: '' });

        } catch (err) {
            console.log(err);
        }
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
                <div className="buttons">
                    <CustomButton type="submit">Sign In</CustomButton>
                    <CustomButton onClick={signInWithGoogle} isGoogleSignIn>Sign in with Google</CustomButton>
                </div>
            </form>
        </div>
    );
};

export default SignIn;
