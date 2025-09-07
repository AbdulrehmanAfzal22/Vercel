import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCdALI7GHc5RbCDmE_D0nGaQiWHxp6Myr8",
  authDomain: "grand-login-78c25.firebaseapp.com",
  projectId: "grand-login-78c25",
  storageBucket: "grand-login-78c25.firebasestorage.app",
  messagingSenderId: "12371664974",
  appId: "1:12371664974:web:8c9c6daaa06174b347231f",
  measurementId: "G-XE79HKZLLT"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

const submit = document.getElementById("submit");
let para11 = document.getElementById("para1");   
let para1 = document.getElementById("para12");  

submit.addEventListener("click", function (event) {
  event.preventDefault(); 

  let email = document.getElementById("email").value.trim();
  let password = document.getElementById("password").value.trim();

  para11.innerText = "";
  para1.innerText = "";


  if (email === "") {
    para11.innerText = "Please enter an email";
  } else if (!email.endsWith("@gmail.com")) {
    para11.innerText = "Please enter a valid Gmail address";
  }

  if (password === "") {
    para1.innerText = "Please enter a password";
  } else if (password === email) {
    para1.innerText = "Password must be different from email";
  } else if (password.length <= 6) {
    para1.innerText = "Password must be longer than 6 characters";
  }


  if (para11.innerText === "" && para1.innerText === "") {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
    
        window.location.href = "home.html"; 
      })
.catch((error) => {
  const errorCode = error.code;

  if (errorCode === "auth/user-not-found") {
    para11.innerText = "No account found with this email";
  } else if (
    errorCode === "auth/wrong-password" || 
    errorCode === "auth/invalid-credential"
  ) {
    para1.innerText = "Wrong password or email. Try again!";
  } else if (errorCode === "auth/invalid-email") {
    para11.innerText = "Invalid email format";
  } else {
    para11.innerText = errorCode; 
  }
});
  }
});
