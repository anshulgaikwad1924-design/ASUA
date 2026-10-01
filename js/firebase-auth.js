import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDGg5tBjc1VI267YWj6xfGoW_pmmjk2t6M",
  authDomain: "karate-c52c4.firebaseapp.com",
  projectId: "karate-c52c4",
  storageBucket: "karate-c52c4.firebasestorage.app",
  messagingSenderId: "162127273209",
  appId: "1:162127273209:web:e0809217eddfbf49501628",
  measurementId: "G-DYEC2V8VDW"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

const currentPage = window.location.pathname.split('/').pop() || 'index.html';

// Auth State Observer
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in.
        if (currentPage === 'login.html' || currentPage === 'signup.html') {
            window.location.href = 'dashboard.html';
        }
    } else {
        // No user is signed in.
        if (currentPage === 'dashboard.html') {
            window.location.href = 'login.html';
        }
    }
});

// Google Sign-In Handling
const googleBtns = document.querySelectorAll('.google-login-btn');
googleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const errorMsg = document.getElementById('error-msg');
        if(errorMsg) errorMsg.style.display = "none";
        
        signInWithPopup(auth, googleProvider)
            .then(async (result) => {
                // Check if user exists in Firestore
                const userRef = doc(db, "users", result.user.uid);
                const docSnap = await getDoc(userRef);
                if (!docSnap.exists()) {
                    // Create new user profile for Google Sign-In
                    await setDoc(userRef, {
                        name: result.user.displayName || "Google User",
                        email: result.user.email,
                        role: "student",
                        belt: "White Belt",
                        batch: "Unassigned",
                        attendance: 0
                    });
                }
                // Success redirect handled by onAuthStateChanged
            })
            .catch((error) => {
                if(errorMsg) {
                    errorMsg.textContent = error.message;
                    errorMsg.style.display = "block";
                }
            });
    });
});

// Login Form Handling
const loginForm = document.getElementById('login-form');
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const errorMsg = document.getElementById('error-msg');
        errorMsg.style.display = "none";
        
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Success redirect is handled by onAuthStateChanged
            })
            .catch((error) => {
                errorMsg.textContent = "Email or password is incorrect";
                errorMsg.style.display = "block";
            });
    });
}

// Signup Form Handling
const signupForm = document.getElementById('signup-form');
if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const nameInput = document.getElementById('name');
        const name = nameInput ? nameInput.value : "Student";
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const errorMsg = document.getElementById('error-msg');
        errorMsg.style.display = "none";
        
        createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                // Save user profile to Firestore
                await setDoc(doc(db, "users", userCredential.user.uid), {
                    name: name,
                    email: email,
                    role: "student",
                    belt: "White Belt",
                    batch: "Unassigned",
                    attendance: 0
                });
                // Success redirect is handled by onAuthStateChanged
            })
            .catch((error) => {
                if (error.code === 'auth/email-already-in-use') {
                    errorMsg.textContent = "User already exists. Please sign in";
                } else {
                    errorMsg.textContent = error.message;
                }
                errorMsg.style.display = "block";
            });
    });
}

// Logout Handling
const logoutBtn = document.getElementById('logout-btn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        signOut(auth).catch((error) => {
            console.error("Logout Error:", error);
        });
    });
}

export { auth, db };
