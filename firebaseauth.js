 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
 import {getAuth,createUserWithEmailAndPassword, signInWithEmailAndPassword , sendPasswordResetEmail} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
 import{getFirestore, setDoc, doc} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js"
 
 const firebaseConfig = {
        apiKey: "AIzaSyBZW95KpltjxMDmeJwhMdSRH2IMful64j0",
        authDomain: "login-5a114.firebaseapp.com",
        projectId: "login-5a114",
        storageBucket: "login-5a114.firebasestorage.app",
        messagingSenderId: "416197266957",
        appId: "1:416197266957:web:979dceb30513dd23100f44"
    
 };

 // Initialize Firebase
 const app = initializeApp(firebaseConfig);

 function showMessage(message, divId){
    var messageDiv=document.getElementById(divId);
    messageDiv.style.display="block";
    messageDiv.innerHTML=message;
    messageDiv.style.opacity=1;
    setTimeout(function(){
        messageDiv.style.opacity=0;
    },5000);
 }
 const signUp=document.getElementById('submitSignUp');
 signUp.addEventListener('click', (event)=>{
    event.preventDefault();
    const email=document.getElementById('rEmail').value;
    const password=document.getElementById('rPassword').value;
    const firstName=document.getElementById('fName').value;
    const lastName=document.getElementById('lName').value;

    const auth=getAuth();
    const db=getFirestore();

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential)=>{
        const user=userCredential.user;
        const userData={
            email: email,
            firstName: firstName,
            lastName:lastName
        };
        showMessage('Account Created Successfully', 'signUpMessage');
        const docRef=doc(db, "users", user.uid);
        setDoc(docRef,userData)
        .then(()=>{
            window.location.href='index.html';
        })
        .catch((error)=>{
            console.error("error writing document", error);

        });
    })
    .catch((error)=>{
        const errorCode=error.code;
        if(errorCode=='auth/email-already-in-use'){
            alert('Email Address Already Exists !!!', 'signUpMessage');
        }
        else{
            alert('unable to create User', 'signUpMessage');
        }
    })
 });

 const signIn=document.getElementById('submitSignIn');
 signIn.addEventListener('click', (event)=>{
    event.preventDefault();
    const email=document.getElementById('email').value;
    const password=document.getElementById('password').value;
    const auth=getAuth();

    signInWithEmailAndPassword(auth, email,password)
    .then((userCredential)=>{
        showMessage('login is successful', 'signInMessage');
        const user=userCredential.user;
        localStorage.setItem('loggedInUserId', user.uid);
        window.location.assign='student.html';
    })
    .catch((error)=>{
        const errorCode=error.code;
        if(errorCode==='auth/invalid-credential'){
            alert('Incorrect Email or Password', 'signInMessage');
        }
        else{
            showMessage('Account does not Exist', 'signInMessage');
            alert('Account Does not Exist Please try to sign Up', 'signInMessage');
        }
    })
 })

// Reset password logic
const resetButton = document.getElementById("reset");
resetButton.addEventListener("click", function(event) {
    event.preventDefault();  // Prevent default form submission
    
    let email = document.querySelector("#email").value;  // Get the email input value
    
    // Check if email is provided
    if (!email) {
        alert("Please enter your email address!");
        return;
    }
    
    const auth = getAuth();  // Initialize Firebase Auth

    // Send password reset email
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("Password reset email sent! Please check your inbox.");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        
        if (errorCode === 'auth/user-not-found') {
            alert("No user found with this email address.");
        } else {
            alert("Error: " + errorMessage);
        }
      });
});
