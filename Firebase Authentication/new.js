// Import Firebase SDK (must be "type=module" in HTML)
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

// 🔹 Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCdALI7GHc5RbCDmE_D0nGaQiWHxp6Myr8",
  authDomain: "grand-login-78c25.firebaseapp.com",
  projectId: "grand-login-78c25",
  storageBucket: "grand-login-78c25.firebasestorage.app",
  messagingSenderId: "12371664974",
  appId: "1:12371664974:web:8c9c6daaa06174b347231f",
  measurementId: "G-XE79HKZLLT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

let createBtn = document.getElementById("createBtn");

createBtn.addEventListener("click", function (event) {
  event.preventDefault(); 

  let name = document.getElementById("name").value.trim();
  let username = document.getElementById("username").value.trim(); // this is the email
  let password1 = document.getElementById("password1").value.trim();
  let password2 = document.getElementById("password2").value.trim();

  let nameError = document.getElementById("nameError");
  let usernameError = document.getElementById("usernameError");
  let password1Error = document.getElementById("password1Error");
  let password2Error = document.getElementById("password2Error");

  let isValid = true;

  // ✅ Validation
  if (name === "") {
    nameError.innerText = "Please enter your full name";
    isValid = false;
  } else {
    nameError.innerText = "";
  }

  if (username === "") {
    usernameError.innerText = "Please enter your username";
    isValid = false;
  } else if (!username.endsWith("@gmail.com")) {
    usernameError.innerText = "Username must be a valid Gmail address";
    isValid = false;
  } else {
    usernameError.innerText = "";
  }

  if (password1 === "") {
    password1Error.innerText = "Please enter a password";
    isValid = false;
  } else if (password1.length <= 6) {
    password1Error.innerText = "Password must be longer than 6 characters";
    isValid = false;
  } else if (password1 === username) {
    password1Error.innerText = "Password must be different from username";
    isValid = false;
  } else {
    password1Error.innerText = "";
  }

  if (password2 === "") {
    password2Error.innerText = "Please confirm your password";
    isValid = false;
  } else if (password2 !== password1) {
    password2Error.innerText = "Passwords do not match";
    isValid = false;
  } else {
    password2Error.innerText = "";
  }


  if (isValid) {
    createUserWithEmailAndPassword(auth, username, password1)
      .then((userCredential) => {
        alert("✅ Account created successfully!");
        window.location.href = "index.html"; 
      })
      .catch((error) => {
        const errorCode = error.code;

        if (errorCode === "auth/email-already-in-use") {
          usernameError.innerText = "This email is already in use.";
        } else if (errorCode === "auth/invalid-email") {
          usernameError.innerText = "Invalid email address.";
        } else if (errorCode === "auth/weak-password") {
          password1Error.innerText = "Password is too weak.";
        } else {
          usernameError.innerText = error.message;
        }
      });
  }
});
