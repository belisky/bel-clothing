import React,{useState} from 'react';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, createUserProfileDocument } from '../../config/firebase.config';

const SignUp = () => {
    const [signUpDetails, setSignUpDetails] = useState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword:''
    })
    const { displayName, email, password, confirmPassword } = signUpDetails;
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('passwords dont match');
            return
        } 
        try {
             createUserWithEmailAndPassword(auth, email, password)
                .then(({user})=> {
                      createUserProfileDocument(user, { displayName });
                    setSignUpDetails({
                        displayName: '',
                        email: '',
                        password: '',
                        confirmPassword: ''
                    })
            })
        } catch (err) {
            console.log(err)
        }
    }
    const handleChange = e => {
        const { value, name } = e.target;
        setSignUpDetails(old => ({ ...old, [name]: value }))

    }

    return (
        <div className='sign-up'>
            <h2 className="title">I do not have an account</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit} className="sign-up-form">
                <FormInput
                    type='text'
                    name='displayName'
                    value={displayName}
                    label='Display Name'
                    onChange={handleChange}
                    required
                />
                <FormInput
                    type='email'
                    name='email'
                    value={email}
                    label='Email'
                    onChange={handleChange}
                    required
                />
                <FormInput
                    type='password'
                    name='password'
                    value={password}
                    label='Password'
                    onChange={handleChange}
                    required
                />
                <FormInput
                    type='password'
                    name='confirmPassword'
                    value={confirmPassword}
                    label='Confirm Password'
                    onChange={handleChange}
                    required
                />
                <CustomButton type='submit'> SIGN UP </CustomButton>                 
            </form>
        </div>
    );
};

export default SignUp;
