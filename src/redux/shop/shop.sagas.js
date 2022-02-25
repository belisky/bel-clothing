import { takeLatest, call, put } from 'redux-saga/effects';

import { firestore, convertCollectionsSnapshotToMap } from '../../config/firebase.config'

import { getDocs,collection } from 'firebase/firestore';

import {
    fetchCollectionsSuccess,
    fetchCollectionsFailure
} from './shop.actions';

import ShopActionTypes from './shop.types';

const { FETCH_COLLECTIONS_START } = ShopActionTypes;

export function* fetchCollectionsAsync() {
    try {
        const collectionRef = collection(firestore, 'collections');

        const snapshot = yield getDocs(collectionRef)
        const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapshot)
        yield put(fetchCollectionsSuccess(collectionsMap));
    } catch (error) {
        yield put(fetchCollectionsFailure(error.message))
    }


    // // const collectionsResult = await getDocs(collectionRef)
    // // const collectionsMap = convertCollectionsSnapshotToMap(collectionsResult)


    // const unsubscribe = onSnapshot(collectionRef, (doc) => {
    //     const collectionsMap = convertCollectionsSnapshotToMap(doc)
    //     dispatch(fetchCollectionsSuccess(collectionsMap));
    // }, error => {
    //     dispatch(fetchCollectionsFailure(error.message));
    // })
    // return unsubscribe
    //yield console.log('I am fired');
}

export function* fetchCollectionsStart() {
    yield takeLatest(
        FETCH_COLLECTIONS_START,
        fetchCollectionsAsync
    );
}