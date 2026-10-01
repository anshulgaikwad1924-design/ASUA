import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";
import { auth, db } from "./firebase-auth.js";

const profileName = document.getElementById('profile-name');
const profileBelt = document.getElementById('profile-belt');
const profileBatch = document.getElementById('profile-batch');
const profileAttendance = document.getElementById('profile-attendance');

onAuthStateChanged(auth, async (user) => {
    if (user) {
        // Fetch user data from Firestore
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data();
            
            // Redirect instructor if necessary
            if (data.role === 'instructor' && !window.location.href.includes('instructor-dashboard.html')) {
                window.location.href = 'instructor-dashboard.html';
                return;
            }

            // Populate Student UI
            if (profileName) profileName.textContent = data.name || "Student";
            if (profileBelt) profileBelt.textContent = data.belt || "White Belt";
            if (profileBatch) profileBatch.textContent = data.batch || "Unassigned";
            if (profileAttendance) profileAttendance.textContent = data.attendance + " Classes" || "0 Classes";
            
        } else {
            console.log("No such document!");
        }
    }
});
