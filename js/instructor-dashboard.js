import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
import { collection, query, where, getDocs, doc, getDoc, updateDoc, increment } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";
import { auth, db } from "./firebase-auth.js";

const studentList = document.getElementById('student-list');

onAuthStateChanged(auth, async (user) => {
    if (user) {
        // Verify user is an instructor
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists() && docSnap.data().role === 'instructor') {
            loadStudents();
        } else {
            // Not an instructor, send back to student dashboard
            window.location.href = 'dashboard.html';
        }
    } else {
        window.location.href = 'login.html';
    }
});

async function loadStudents() {
    studentList.innerHTML = '<tr><td colspan="4" style="text-align: center; padding: 1rem;">Loading students...</td></tr>';
    
    const q = query(collection(db, "users"), where("role", "==", "student"));
    const querySnapshot = await getDocs(q);
    
    studentList.innerHTML = '';
    
    if (querySnapshot.empty) {
        studentList.innerHTML = '<tr><td colspan="4" style="text-align: center; padding: 1rem;">No students found.</td></tr>';
        return;
    }

    querySnapshot.forEach((docSnap) => {
        const data = docSnap.data();
        const tr = document.createElement('tr');
        tr.style.borderBottom = '1px solid #ddd';
        
        tr.innerHTML = `
            <td style="padding: 10px;">${data.name || 'Unknown'}</td>
            <td style="padding: 10px; color: var(--accent); font-weight: bold;">${data.belt || 'White Belt'}</td>
            <td style="padding: 10px;" id="attendance-${docSnap.id}">${data.attendance || 0}</td>
            <td style="padding: 10px; text-align: center;">
                <button class="btn mark-present-btn" data-id="${docSnap.id}" style="padding: 0.5rem 1rem; font-size: 0.8rem; background: green; color: white;">Mark Present</button>
            </td>
        `;
        studentList.appendChild(tr);
    });

    // Attach event listeners to buttons
    document.querySelectorAll('.mark-present-btn').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            const studentId = e.target.getAttribute('data-id');
            const studentRef = doc(db, "users", studentId);
            
            // Optimistic UI update
            const attendanceCell = document.getElementById(`attendance-${studentId}`);
            let currentVal = parseInt(attendanceCell.textContent);
            attendanceCell.textContent = currentVal + 1;
            e.target.disabled = true;
            e.target.textContent = "Marked";
            e.target.style.background = "#666";

            // Update Firestore
            await updateDoc(studentRef, {
                attendance: increment(1)
            });
        });
    });
}
