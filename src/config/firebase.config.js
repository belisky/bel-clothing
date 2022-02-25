import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, setDoc, serverTimestamp, getDoc, writeBatch } from 'firebase/firestore';
import { getAuth,signInWithPopup,GoogleAuthProvider } from 'firebase/auth';

 
const app=initializeApp( { 

    apiKey:'AIzaSyAMgyG4raiF06iVkRFCbKk1XRgCHTlh37A',

    authDomain: 'b-commerce-dev.firebaseapp.com',

    projectId:'b-commerce-dev',

    storageBucket: 'b-commerce-dev.appspot.com',

    messagingSenderId: '151808759160',

    appId:'1:151808759160:web:cffa1af06f1cebe836248d'


});
export const auth = getAuth(app);
export const firestore = getFirestore(app);

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {

    const batch = writeBatch(firestore);
    objectsToAdd.forEach(obj => {
        const collectionRef = doc(collection(firestore, collectionKey));
        // const newDocRef = doc(collectionRef);
        batch.set(collectionRef, obj);
    })
    return await batch.commit()
}

export const convertCollectionsSnapshotToMap = collections => {
    const transformedCollection = collections.docs.map(doc => {
        const { title, items } = doc.data();

        return {
            routeName: encodeURI(title.toLowerCase()),
            id: doc.id,
            title,
            items
        }
    })
    return transformedCollection.reduce((accumulator, collection) => {
        accumulator[collection.title.toLowerCase()] = collection;
        return accumulator
},{})
}

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const newUserRef = doc(firestore, 'users',`${userAuth.uid}`);
    const docSnap = await getDoc(newUserRef);
     
    if (!docSnap.exists()) {
        const { displayName, email } = userAuth;
        try {
            await setDoc(newUserRef, {
                displayName: displayName,
                email: email,
                createdAt: serverTimestamp(),
                additionalData: { ...additionalData }
            })
        } catch (error) {
            console.log('error creating user', error.message)
        }

    }
    return newUserRef;
    //await setDoc(newUserRef, data);


}
export const googleProvider = new GoogleAuthProvider();
export const signInWithGoogle = () => {
    googleProvider.setCustomParameters({ prompt: "select_account" });
    signInWithPopup(auth, googleProvider)
        .then((re) => { console.log(re) })
        .catch((err) => {
        console.log(err)
    })
}
        

export default app;
