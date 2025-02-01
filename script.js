// بيانات المستخدمين (محفوظة في LocalStorage)
let users = JSON.parse(localStorage.getItem('users')) || [
    { username: "admin", password: "sobaishereadmin" }
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
        // إخفاء صفحة تسجيل الدخول وإظهار صفحة الإدارة
        document.querySelector('.auth-container').classList.add('hidden');
        document.getElementById('adminPage').classList.remove('hidden');
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
        localStorage.setItem('users', JSON.stringify(users)); // حفظ البيانات في LocalStorage
        alert('Registration successful! Please login.');
        document.getElementById('registerForm').classList.add('hidden');
        document.getElementById('loginForm').classList.remove('hidden');
    }
});

// إضافة دومين
function addDomain() {
    const domainInput = document.getElementById('domainInput').value;
    if (domainInput) {
        const domainList = document.getElementById('domainList');
        const li = document.createElement('li');
        li.textContent = domainInput;
        domainList.appendChild(li);
        document.getElementById('domainInput').value = '';
    }
}
