import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config =  {
  apiKey: "AIzaSyAFoLqbmeZ1coN8qn9Ipzh8QxA4kRGPAmM",
  authDomain: "crwn-db-27e3f.firebaseapp.com",
  databaseURL: "https://crwn-db-27e3f.firebaseio.com",
  projectId: "crwn-db-27e3f",
  storageBucket: "crwn-db-27e3f.appspot.com",
  messagingSenderId: "805265008523",
  appId: "1:805265008523:web:970a90725aac864693718e",
  measurementId: "G-1WRV6N9870"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
