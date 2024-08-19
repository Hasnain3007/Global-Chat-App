import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-app.js";

const firebaseConfig = {
    apiKey: "AIzaSyD431Y9W6wrJodPUbYe0ic3HRMKPdRvr5s",
    authDomain: "practice-d1871.firebaseapp.com",
    projectId: "practice-d1871",
    storageBucket: "practice-d1871.appspot.com",
    messagingSenderId: "507221909663",
    appId: "1:507221909663:web:e4655ebb4a683e7daa82aa"
};
import { getAuth,signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-auth.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);  // Ensure this is the correct path to your signup.js file

let signIn = () => {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log('Login successful');

            Swal.fire({
                title: "Good job!",
                text: "You have successfully logged in!",
                icon: "success"
            });

            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1100);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error('Login failed:', errorMessage);

            Swal.fire({
                title: "Login Failed",
                text: errorMessage,
                icon: "error"
            });
        });
}

var btn = document.getElementById('loginBTN');
btn.addEventListener('click', signIn);
