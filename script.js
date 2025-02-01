// بيانات المستخدمين (وهمية)
let users = [
    { username: "user1", password: "pass1" },
    { username: "user2", password: "pass2" }
];

// تبديل بين تسجيل الدخول والتسجيل
document.getElementById('showRegister').addEventListener('click', function (e) {
    e.preventDefault();
    document.getElementById('loginForm').classList.add('hidden');
    document.getElementById('registerForm').classList.remove('hidden');
});

document.getElementById('showLogin').addEventListener('click', function (e) {
    e.preventDefault();
    document.getElementById('registerForm').classList.add('hidden');
    document.getElementById('loginForm').classList.remove('hidden');
});

// تسجيل الدخول
document.getElementById('loginForm').querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        // إخفاء صفحة تسجيل الدخول وإظهار الصفحة الترحيبية
        document.querySelector('.auth-container').classList.add('hidden');
        document.getElementById('welcomePage').classList.remove('hidden');
    } else {
        alert('Invalid username or password!');
    }
});

// تسجيل مستخدم جديد
document.getElementById('registerForm').querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault();
    const newUsername = document.getElementById('newUsername').value;
    const newPassword = document.getElementById('newPassword').value;

    if (users.some(u => u.username === newUsername)) {
        alert('Username already exists!');
    } else {
        users.push({ username: newUsername, password: newPassword });
        alert('Registration successful! Please login.');
        document.getElementById('registerForm').classList.add('hidden');
        document.getElementById('loginForm').classList.remove('hidden');
    }
});
