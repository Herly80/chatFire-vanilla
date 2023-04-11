 import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
 import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js'
 import { getFirestore } from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore.js'

 const firebaseConfig = {
   apiKey: "AIzaSyA3i2IJYOoGa0xbfwhdfpFSLF2VUu-_WHs",
   authDomain: "chatfire-4a2f8.firebaseapp.com",
   projectId: "chatfire-4a2f8",
   storageBucket: "chatfire-4a2f8.appspot.com",
   messagingSenderId: "698882340871",
   appId: "1:698882340871:web:cf9eeadf8065c67f4fd2a2"
 };

 // Initialize Firebase
 const app = initializeApp(firebaseConfig);
 const auth = getAuth(app);
 const provider = new GoogleAuthProvider();

 const registerUser = () => signInWithPopup(auth, provider)

 const outSesion = signOut

 const onAuthUser = onAuthStateChanged


 export {
    registerUser, auth, provider, onAuthUser, outSesion,
 };