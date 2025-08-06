const loginForm = document.getElementById('login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

    const user = existingUsers.find((user) => user.email === email && user.password === password);
    if (user) {
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        window.location.href = 'home.html';
    } else {
        alert('Invalid email or password');
    }
});