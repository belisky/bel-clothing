import UserActionTypes from "./user.types";


const {  
    GOOGLE_SIGN_IN_START,
    SIGN_IN_SUCCESS,
    SIGN_IN_FAILURE,
    EMAIL_SIGN_IN_START
} = UserActionTypes;

 
export const googleSignInStart = () => ({
    type: GOOGLE_SIGN_IN_START
});

export const SignInSuccess = (user) => ({
    type: SIGN_IN_SUCCESS,
    payload: user
})

export const SignInFailure = error => ({
    type: SIGN_IN_FAILURE,
    payload: error
})
export const emailSignInStart = emailAndPassword => ({
    type: EMAIL_SIGN_IN_START,
    payload:emailAndPassword
});



