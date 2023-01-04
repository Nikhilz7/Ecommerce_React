import { initializeApp } from 'firebase/app';
import { 
    getAuth, 
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth';

import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    writeBatch,
    query,
    getDocs,
} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyA_XQHElUyTQ1oVxIb1Snt8VBl4hOdFQiQ",
    authDomain: "clothing-ecom-2755a.firebaseapp.com",
    projectId: "clothing-ecom-2755a",
    storageBucket: "clothing-ecom-2755a.appspot.com",
    messagingSenderId: "118187941991",
    appId: "1:118187941991:web:8dcabf15516d0a8c6634c2"
  };

  
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const  addCollectionAndDocuments = async (collectionKey, objectsToAdd, field = 'title') => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);

    objectsToAdd.forEach((object) =>{
        const docRef = doc(collectionRef, object[field].toLowerCase());
        batch.set(docRef, object);
    });

    await batch.commit();
    console.log('done');

};

export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);

    // await Promise.reject(new Error('Cannot find categories'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((docSnapshot) => docSnapshot.data());
        
    // .reduce((acc, docSnapshot) => {
    //     const { title, items} = docSnapshot.data();
    //     acc[title.toLowerCase()] = items;
    //     return acc;
    // },{})

    // return categoryMap;
};


export const createUserDocumentFromAuth = async (userAuth, additionalInformation={}) => {
    if(!userAuth) return;
    const userDocRef = doc(db, 'users', userAuth.uid);
        
    const userSnapshot = await getDoc(userDocRef);
    // console.log(userSnapshot);

    if(!userSnapshot.exists()){
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation,
            });
        }
        catch(error){
            console.log('error creating the user', error.message);
        }
    }

    return userSnapshot;

};

export const createAuthUserWithEmailAndPassword = async (email, password) =>{
    if(!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) =>{
    if(!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const OnAuthStateChangeListener = (callback) =>{     //creates a listener with callback as next
    
    onAuthStateChanged(auth, callback);
}

export const getCurrentUser = () => {
    return new Promise((resolve, reject) =>{
        const unsubscribe = onAuthStateChanged(
            auth, 
            (userAuth) => {
                unsubscribe();
                resolve(userAuth);
            },
            reject
        )
    })
}