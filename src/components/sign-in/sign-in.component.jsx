import React, { useState } from 'react';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import './sign-in.styles.scss';
 
import { googleSignInStart,emailSignInStart } from '../../redux/user/user.actions';

import { connect } from 'react-redux';

const SignIn = ({googleSignInStart,emailSignInStart}) => {
    const [inputValues, setInputValues] = useState({ email: '', password: '' });
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = inputValues;
        emailSignInStart(email,password)

         
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
                    <CustomButton type='button' onClick={googleSignInStart} isGoogleSignIn>Sign in with Google</CustomButton>
                </div>
            </form>
        </div>
    );
};

const mapDispatchToProps = dispatch => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart:(email,password)=>dispatch(emailSignInStart({email,password}))
})

export default connect(null,mapDispatchToProps)(SignIn);
