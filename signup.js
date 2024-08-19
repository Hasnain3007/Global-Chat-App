import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyD431Y9W6wrJodPUbYe0ic3HRMKPdRvr5s",
  authDomain: "practice-d1871.firebaseapp.com",
  projectId: "practice-d1871",
  storageBucket: "practice-d1871.appspot.com",
  messagingSenderId: "507221909663",
  appId: "1:507221909663:web:e4655ebb4a683e7daa82aa"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


let signUp = () => {
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log("signUp successful");
      Swal.fire({
        title: "Good job!",
        text: "Your Account Is Now Live!",
        icon: "success"
      });
      setTimeout(() => {
        window.location.href = 'login.html';
      }, 1100);
    })
    .catch((error) => {
      console.error('Error during sign-up:', error.message);
      Swal.fire({
        title: "Error",
        text: error.message,
        icon: "error"
      });
    });
}

var btn = document.getElementById('signupBTN');
btn.addEventListener('click', signUp);
