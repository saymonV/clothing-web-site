import { initializeApp } from 'firebase/app';

// Importing Google Authentication components
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

// Firestore database components
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyByuepMpiItehEE3ILdV0mbGWvE17vrEuU",
  authDomain: "crown-clothing-e465d.firebaseapp.com",
  projectId: "crown-clothing-e465d",
  storageBucket: "crown-clothing-e465d.firebasestorage.app",
  messagingSenderId: "405377885375",
  appId: "1:405377885375:web:0523f8cdb1c6605cae520a"
};

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);



export const db = getFirestore();
// Takes the date from authentication service and creates a profile in database
export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  // Breaks in case there is not userAuth response
  if (!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);
  // Check if users exist in database
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    // Creates a user profile in database
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }
  
  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};
