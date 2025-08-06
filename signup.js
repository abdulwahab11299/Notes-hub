const signupForm = document.getElementById('signup-form');
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const nickname = document.getElementById('nickname').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const profilePicture = document.getElementById('profile-picture').files[0];

    if (password === confirmPassword) {
        const userData = {
            username: username,
            nickname: nickname,
            email: email,
            password: password,
            profilePicture: URL.createObjectURL(profilePicture)
        };
        const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
        existingUsers.push(userData);
        localStorage.setItem('users', JSON.stringify(existingUsers));
        window.location.href = 'confirmation.html';
    } else {
        alert('Passwords do not match');
    }
});