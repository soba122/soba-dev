// بيانات المستخدمين (محفوظة في LocalStorage)
let users = JSON.parse(localStorage.getItem('users')) || [
    { username: "admin", password: "sobaishereadmin", role: "admin" },
    { username: "user1", password: "pass1", role: "user" }
];

// بيانات الدومينات (محفوظة في LocalStorage)
let domains = JSON.parse(localStorage.getItem('domains')) || [
    { name: "example1.ddns.net", 5M Credit },
    { name: "example2.ddns.me", 3M Credit }
];

// بيانات الطلبات (محفوظة في LocalStorage)
let orders = JSON.parse(localStorage.getItem('orders')) || [];

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
        if (user.role === "admin") {
            // إظهار صفحة الإدارة
            document.querySelector('.auth-container').classList.add('hidden');
            document.getElementById('adminPage').classList.remove('hidden');
            loadOrders();
        } else {
            // إظهار صفحة المستخدم
            document.querySelector('.auth-container').classList.add('hidden');
            document.getElementById('userPage').classList.remove('hidden');
            loadDomains();
        }
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
        users.push({ username: newUsername, password: newPassword, role: "user" });
        localStorage.setItem('users', JSON.stringify(users)); // حفظ البيانات في LocalStorage
        alert('Registration successful! Please login.');
        document.getElementById('registerForm').classList.add('hidden');
        document.getElementById('loginForm').classList.remove('hidden');
    }
});

// إضافة دومين (للمشرف)
function addDomain() {
    const domainName = document.getElementById('domainName').value;
    const domainPrice = document.getElementById('domainPrice').value;

    if (domainName && domainPrice) {
        domains.push({ name: domainName, price: domainPrice });
        localStorage.setItem('domains', JSON.stringify(domains)); // حفظ البيانات في LocalStorage
        alert('Domain added successfully!');
        document.getElementById('domainName').value = '';
        document.getElementById('domainPrice').value = '';
    } else {
        alert('Please fill in all fields!');
    }
}

// شراء دومين (للمستخدم)
function buyDomain() {
    const domainName = document.getElementById('buyDomainName').value;
    const domain = domains.find(d => d.name === domainName);

    if (domain) {
        orders.push({ domain: domain.name, price: domain.price });
        localStorage.setItem('orders', JSON.stringify(orders)); // حفظ البيانات في LocalStorage
        alert(`You have successfully purchased ${domain.name} for $${domain.price}!`);
        document.getElementById('buyDomainName').value = '';
        loadOrders();
    } else {
        alert('Domain not found!');
    }
}

// تحميل الطلبات (للمشرف)
function loadOrders() {
    const ordersList = document.getElementById('ordersList');
    ordersList.innerHTML = '';
    orders.forEach(order => {
        const li = document.createElement('li');
        li.textContent = `Domain: ${order.domain}, Price: $${order.price}`;
        ordersList.appendChild(li);
    });
}

// تحميل الدومينات (للمستخدم)
function loadDomains() {
    const domainsList = document.getElementById('domainsList');
    domainsList.innerHTML = '';
    domains.forEach(domain => {
        const li = document.createElement('li');
        li.textContent = `Domain: ${domain.name}, Price: $${domain.price}`;
        domainsList.appendChild(li);
    });
}
