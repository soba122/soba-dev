// بيانات المستخدمين (وهمية)
const users = [
    { username: "user1", password: "pass1" },
    { username: "user2", password: "pass2" }
];

// تسجيل الدخول
document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        // إخفاء صفحة تسجيل الدخول وإظهار الصفحة الترحيبية
        document.querySelector('.login-container').classList.add('hidden');
        document.getElementById('welcomePage').classList.remove('hidden');
    } else {
        alert('اسم المستخدم أو كلمة المرور غير صحيحة!');
    }
});
