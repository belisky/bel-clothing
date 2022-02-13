import { initializeApp } from "firebase/app";
import {getFirestore, doc,setDoc, serverTimestamp, getDoc} from 'firebase/firestore';
import { getAuth,signInWithPopup,GoogleAuthProvider } from 'firebase/auth';

 
const app=initializeApp( { 

    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,

    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,

    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,

    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,

    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDERID,

    appId: process.env.REACT_APP_FIREBASE_APP_ID

});
export const auth = getAuth(app);
export const firestore = getFirestore(app);

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
export const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    signInWithPopup(auth, provider)
        .then((re) => { console.log(re) })
        .catch((err) => {
        console.log(err)
    })
}
        

export default app;
