import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

// Your web app's Firebase configuration
const config = {
  apiKey: "AIzaSyDZgXd2BrZ4PxFpf9_rzjnqv7j8FDwOfC0",
  authDomain: "joking-hazard-the-game.firebaseapp.com",
  databaseURL: "https://joking-hazard-the-game.firebaseio.com",
  projectId: "joking-hazard-the-game",
  storageBucket: "joking-hazard-the-game.appspot.com",
  messagingSenderId: "613620128170",
  appId: "1:613620128170:web:e9947e0d6ca2dc96"
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