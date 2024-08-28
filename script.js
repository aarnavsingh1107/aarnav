const apiBaseUrl = 'http://localhost:5001/api';

// Register User
document.getElementById('register-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const response = await fetch(`${apiBaseUrl}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
    });

    const data = await response.json();
    alert(data.message || data.error);
    if (response.ok) window.location.href = 'login.html';
});

// Login User
document.getElementById('login-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const response = await fetch(`${apiBaseUrl}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    alert(data.message || data.error);
    if (response.ok) {
        localStorage.setItem('token', data.token);
        window.location.href = 'complaint.html';
    }
});

// Register Complaint
document.getElementById('complaint-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const location = document.getElementById('location').value;
    const description = document.getElementById('description').value;
    const image = document.getElementById('image').files[0];

    const formData = new FormData();
    formData.append('location', location);
    formData.append('description', description);
    formData.append('image', image);
    formData.append('userId', 'USER_ID'); // Replace with actual user ID after implementing user session management

    const response = await fetch(`${apiBaseUrl}/complaints/register`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        body: formData,
    });

    const data = await response.json();
    alert(data.message || data.error);
});

// Fetch Complaints
async function fetchComplaints() {
    const response = await fetch(`${apiBaseUrl}/media`);
    const complaints = await response.json();

    const complaintsDiv = document.getElementById('complaints');
    complaints.forEach(complaint => {
        const complaintElement = document.createElement('div');
        complaintElement.innerHTML = `
            <h3>${complaint.location}</h3>
            <p>${complaint.description}</p>
            <img src="${complaint.imageUrl}" alt="Pothole Image" style="max-width:100%;">
            <small>Submitted by: ${complaint.userId.username}</small>
        `;
        complaintsDiv.appendChild(complaintElement);
    });
}

if (document.getElementById('complaints')) fetchComplaints();
