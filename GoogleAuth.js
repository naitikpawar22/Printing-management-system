 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
 import {getAuth, GoogleAuthProvider , signInWithPopup} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
 import{getFirestore, setDoc, doc} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js"
 
 const firebaseConfig = {
        apiKey: "AIzaSyBZW95KpltjxMDmeJwhMdSRH2IMful64j0",
        authDomain: "login-5a114.firebaseapp.com",
        projectId: "login-5a114",
        storageBucket: "login-5a114.firebasestorage.app",
        messagingSenderId: "416197266957",
        appId: "1:416197266957:web:979dceb30513dd23100f44"
    
 };

 const app = initializeApp(firebaseConfig);

 const auth = getAuth(app);
 auth.languageCode = 'en';

 const provider = new GoogleAuthProvider();

const googleLogin = document.getElementById("google-login-btn")
googleLogin.addEventListener("click" , function(){
       signInWithPopup(auth, provider)
       .then((result) => {
         const credential = GoogleAuthProvider.credentialFromResult(result);
         const user = result.user;
         console.log(user)
         window.location.href = "student.html";

       }).catch((error) => {
         const errorCode = error.code;
         const errorMessage = error.message; 
       });
     
})
