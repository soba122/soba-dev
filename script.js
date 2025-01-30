// بيانات المستخدمين (وهمية)
const users = [
    { username: "user1", password: "pass1" },
    { username: "user2", password: "pass2" }
];

// تبديل بين تسجيل الدخول والتسجيل
document.getElementById('showRegister').addEventListener('click', function (e) {
    e.preventDefault();
    document.getElementById('loginForm').classList.add('hidden');
    document.getElementById('registerForm').classList.remove('hidden');
    clearErrors();
});

document.getElementById('showLogin').addEventListener('click', function (e) {
    e.preventDefault();
    document.getElementById('registerForm').classList.add('hidden');
    document.getElementById('loginForm').classList.remove('hidden');
    clearErrors();
});

// تسجيل الدخول
document.getElementById('loginForm').querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        showWelcomePage(username);
    } else {
        showError('loginError', 'اسم المستخدم أو كلمة المرور غير صحيحة!');
    }
});

// تسجيل مستخدم جديد
document.getElementById('registerForm').querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('registerUsername').value;
    const password = document.getElementById('registerPassword').value;

    if (users.some(u => u.username === username)) {
        showError('registerError', 'اسم المستخدم موجود مسبقًا!');
    } else {
        users.push({ username, password });
        showWelcomePage(username);
    }
});

// عرض الصفحة الترحيبية
function showWelcomePage(username) {
    document.getElementById('loginForm').classList.add('hidden');
    document.getElementById('registerForm').classList.add('hidden');
    document.getElementById('welcomePage').classList.remove('hidden');
    document.getElementById('welcomePage').querySelector('h2').textContent = `Welcome, ${username}!`;
    clearErrors();
}

// عرض الملف الشخصي (وهمي)
function showProfile() {
    alert('Profile page is under construction.');
}

// تسجيل الخروج
function logout() {
    document.getElementById('welcomePage').classList.add('hidden');
    document.getElementById('loginForm').classList.remove('hidden');
    document.getElementById('loginUsername').value = '';
    document.getElementById('loginPassword').value = '';
    clearErrors();
}

// عرض رسالة خطأ
function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
}

// مسح رسائل الخطأ
function clearErrors() {
    document.getElementById('loginError').textContent = '';
    document.getElementById('registerError').textContent = '';
}