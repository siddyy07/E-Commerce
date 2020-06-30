import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {

    apiKey: "AIzaSyDjxf5WZhjE49-d9hxKgDs0hD0Y_kXqeN0",
    authDomain: "shoping-d9f5b.firebaseapp.com",
    databaseURL: "https://shoping-d9f5b.firebaseio.com",
    projectId: "shoping-d9f5b",
    storageBucket: "shoping-d9f5b.appspot.com",
    messagingSenderId: "808304629057",
    appId: "1:808304629057:web:e20f8c4538a9f612ca3dc0",
    measurementId: "G-NC19SX21G0"
};

export const createUserProfileDocument = async (userAuth, additonalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists) {
        const { displayName, email} = userAuth
        const createdAt= new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additonalData
            })
        } catch(error) {
            console.log('error createing user', error.messgae);
            
        }
    }
    return userRef;
};

firebase.initializeApp(config);


export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase;


