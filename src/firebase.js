import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

// Your web app's Firebase configuration
const config = {
  apiKey: "AIzaSyAGDj14qScf1VTkAUByWt148b0QfPwibBQ",
  authDomain: "colors-187a0.firebaseapp.com",
  databaseURL: "https://colors-187a0.firebaseio.com",
  projectId: "colors-187a0",
  storageBucket: "colors-187a0.appspot.com",
  messagingSenderId: "821102756911",
  appId: "1:821102756911:web:0cb2e083167ae7cc"
};
// Initialize Firebase
firebase.initializeApp(config);

export const firestore = firebase.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage();

export const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export const signOut = () => auth.signOut();

firestore.settings({ timestampsInSnapshots: true });

window.firebase = firebase;

export const createUserProfileDocument = async(user, additionalData) => {

  if(!user) return;
  //Get a reference to the place in the database 
  const userRef = firestore.doc(`users/${user.uid}`)

  //Go and fetch the document from that locaction.
  const snapshot = await userRef.get();

  if(!snapshot.exists) {
    const { displayName, email, photoURL } = user;

    const createdAt = new Date();
    try {
      await userRef.set({
        displayName, 
        email,
        photoURL,
        createdAt,
        ...additionalData,
      })
    } catch (error) {
      console.error('Error creating user', error.message);
    }
  }

  return getUserDocument(user.uid);
}

export const getUserDocument = uid => {
  if(!uid) return null;
  try {
    return firestore.collection('users').doc(uid);
  } catch (error) {
    console.error('Error fetching user', error.message)
  }
}

export default firebase;