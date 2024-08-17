import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp, onSnapshot, query, orderBy } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-firestore.js";
import { getAuth, onAuthStateChanged ,signOut} from "https://www.gstatic.com/firebasejs/10.3.0/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD431Y9W6wrJodPUbYe0ic3HRMKPdRvr5s",
    authDomain: "practice-d1871.firebaseapp.com",
    projectId: "practice-d1871",
    storageBucket: "practice-d1871.appspot.com",
    messagingSenderId: "507221909663",
    appId: "1:507221909663:web:e4655ebb4a683e7daa82aa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Set to track displayed messages
const displayedMessages = new Set();

// Display the message on the chat
function displayMessage(message, isUser) {
    let chat = document.getElementById("chat");
    let messageElement = document.createElement("div");
    messageElement.classList.add("message");
    if (isUser) {
        messageElement.classList.add("user");
    } else {
        messageElement.classList.add("bot");
    }
    let avatar = document.createElement("div");
    avatar.classList.add("avatar");
    let text = document.createElement("div");
    text.classList.add("text");
    text.innerHTML = message;
    messageElement.appendChild(avatar);
    messageElement.appendChild(text);
    chat.appendChild(messageElement);
    chat.scrollTop = chat.scrollHeight; // Scroll to the bottom of the chat
}

// Send the user message to Firestore and display it
async function sendMessage() {
    let input = document.getElementById("input").value;
    if (input) {
        const user = auth.currentUser;
        if (user) {
            try {
                // Save the message to Firestore
                await addDoc(collection(db, "messages"), {
                    text: input,
                    timestamp: serverTimestamp(),
                    user: "user" // Add a user field to differentiate messages
                });

                displayMessage(input, true); // Display the user's message locally

                document.getElementById("input").value = ""; // Clear the input field
                
            } catch (error) {
                console.error("Error adding message: ", error);
            }
        } else {
            alert("You must be logged in to send messages.");
        }
    }
}

// Listen for new messages in Firestore
const q = query(collection(db, "messages"), orderBy("timestamp"));
onSnapshot(q, (snapshot) => {
    snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
            let messageData = change.doc.data();
            let message = messageData.text;
            let isUser = messageData.user === "user"; // Check if the message is from the user
            let messageId = change.doc.id; // Get the document ID

            // Check if the message has already been displayed
            if (!displayedMessages.has(messageId)) {
                displayMessage(message, isUser); // Display the message from Firestore
                displayedMessages.add(messageId); // Mark the message as displayed
            }
        }
    });
});

// Monitor authentication state
onAuthStateChanged(auth, (user) => {
    if (user) {
        document.getElementById("login-prompt").style.display = "none";
        document.getElementById("chat-container").style.display = "block";
    } else {
        window.location.href = 'login.html'
        document.getElementById("login-prompt").style.display = "block";
        document.getElementById("chat-container").style.display = "none";
    }
});

// Add event listeners for chat functionality
document.getElementById("button").addEventListener("click", sendMessage);

document.getElementById("input").addEventListener("keypress", function(event) {
    if (event.keyCode === 13) {
        sendMessage(); // Send message on Enter key press
    }
});

document.getElementById("logout-button").addEventListener("click", () => {
    signOut(auth).then(() => {
        // Sign-out successful.
        console.log("Logged out successfully.");
        // Redirect to login page or update UI accordingly
        window.location.href = "login.html"; // Replace with your login page URL
    }).catch((error) => {
        // An error happened.
        console.error("Error logging out: ", error);
    });
});
