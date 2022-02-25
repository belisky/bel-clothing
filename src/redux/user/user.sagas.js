import { takeLatest, put,all,call} from 'redux-saga/effects';

import UserActionTypes from './user.types';

import { auth,googleProvider,createUserProfileDocument } from '../../config/firebase.config';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import {    SignInFailure,   SignInSuccess } from './user.actions';
import { getDoc } from 'firebase/firestore';

const {
    GOOGLE_SIGN_IN_START,
    EMAIL_SIGN_IN_START
}=UserActionTypes

export function* getSnapshotFromUserAuth(userAuth) {
    try {
        const userRef = yield call(createUserProfileDocument, userAuth)
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

export function* userSagas() {
    yield all([call(onGoogleSignInStart),call(onEmailSignInStart)])
}