import ShopActionTypes from "./shop.types";
import { firestore, convertCollectionsSnapshotToMap } from "../../config/firebase.config";
import { doc,onSnapshot,collection, getDocs } from "firebase/firestore";

const {
    FETCH_COLLECTIONS_START,
    FETCH_COLLECTIONS_SUCCESS,
    FETCH_COLLECTIONS_FAILURE
   } = ShopActionTypes;

export const fetchCollectionsStart = () => ({
    type: FETCH_COLLECTIONS_START   
})

export const fetchCollectionsSuccess = collectionsMap => ({
    type: FETCH_COLLECTIONS_SUCCESS,
    payload:collectionsMap
})

export const fetchCollectionsFailure = errorMessage => ({
    type: FETCH_COLLECTIONS_FAILURE,
    payload:errorMessage
})

export const fetchCollectionsStartAsync = () => {
    return dispatch => {
        const collectionRef = collection(firestore, 'collections');
        dispatch(fetchCollectionsStart());

        // const collectionsResult = await getDocs(collectionRef)
        // const collectionsMap = convertCollectionsSnapshotToMap(collectionsResult)
        

        const unsubscribe = onSnapshot(collectionRef, (doc) => {
            const collectionsMap = convertCollectionsSnapshotToMap(doc)
            dispatch(fetchCollectionsSuccess(collectionsMap));
        }, error => {
            dispatch(fetchCollectionsFailure(error.message));
        })
        return unsubscribe
    }
}