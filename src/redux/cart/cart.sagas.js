import {all,call,put, takeLatest } from "redux-saga/effects"

import UserActionTypes from "../user/user.types";

import { clearCart } from "./cart.actions"
 
const {SIGN_OUT_SUCCESS}=UserActionTypes

export function* clearCartOnSignOut() {
    yield put(clearCart())
}

export function* onSignOutSuccess() {
    yield takeLatest(SIGN_OUT_SUCCESS, clearCartOnSignOut);
}

export function* cartSagas() {
    yield(all([call(onSignOutSuccess)]))
}