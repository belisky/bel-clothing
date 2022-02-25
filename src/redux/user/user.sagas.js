import { takeLatest, put,all,call} from 'redux-saga/effects';

import UserActionTypes from './user.types';

import { auth,googleProvider,createUserProfileDocument,getCurrentUser } from '../../config/firebase.config';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import {    SignInFailure,   SignInSuccess,signOutSuccess,signOutFailure, signUpFailure, signUpSuccess } from './user.actions';
import { getDoc } from 'firebase/firestore';

const {
    GOOGLE_SIGN_IN_START,
    EMAIL_SIGN_IN_START,
    CHECK_USER_SESSION,
    SIGN_OUT_START,
    SIGN_UP_START,
    SIGN_UP_SUCCESS
}=UserActionTypes

export function* getSnapshotFromUserAuth(userAuth,additionalData) {
    try {
        const userRef = yield call(createUserProfileDocument, userAuth,additionalData)
    const userSnapshot = yield getDoc(userRef)
    yield put(SignInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }))
    } catch (error) {
        yield put(SignInFailure(error))
    }

}

export function* signInWithGoogle() {
    try {
        const { user } = yield signInWithPopup(auth, googleProvider)
        yield getSnapshotFromUserAuth(user);
    } catch (error) {
        yield put(SignInFailure(error))
    }
}

export function* onGoogleSignInStart() {
    yield takeLatest(GOOGLE_SIGN_IN_START,signInWithGoogle)
}

export function* signInWithEmail({ email, password }) {
    try {
        const { user } = yield signInWithEmailAndPassword(auth, email, password);
        yield getSnapshotFromUserAuth(user)
    } catch (error) {
        yield put(SignInFailure(error))
    }
}
export function* onEmailSignInStart() {
    yield takeLatest(EMAIL_SIGN_IN_START,signInWithEmail)
}

export function* isUserAuthenticated() {
    try {
        const userAuth = yield getCurrentUser();
        if (!userAuth) return;
        yield getSnapshotFromUserAuth(userAuth)
    } catch (error) {
        yield put(SignInFailure(error))
    }
}

export function* onCheckUserSession() {
    yield takeLatest(CHECK_USER_SESSION,isUserAuthenticated)
}

export function* signOut() {
    try {
        yield auth.signOut()
        yield put(signOutSuccess())
    } catch (error) {
        yield put(signOutFailure(error))
    }
}

export function* signUp({email,password,displayName}) {
    try {
        const { user } = yield createUserWithEmailAndPassword(auth, email, password)
       yield put(signUpSuccess({user,additionalData:{displayName}})) 
    } catch (error) {
        yield put(signUpFailure(error))
    }
}

export function* signInAfterSignUp({user,additionalData}) {
    yield getSnapshotFromUserAuth(user,additionalData)
}

export function* onSignUpSuccess() {
    yield takeLatest(SIGN_UP_SUCCESS,signInAfterSignUp )
}

export function* onSignOutStart() {
    yield takeLatest(SIGN_OUT_START,signOut)
    
}

export function* onSignUpStart() {
    yield takeLatest(SIGN_UP_START,signUp)
}

export function* userSagas() {
    yield all([call(onGoogleSignInStart),
        call(onEmailSignInStart),
        call(isUserAuthenticated),
        call(onSignOutStart),
        call(onSignUpStart),
    call(onSignUpSuccess)])
}