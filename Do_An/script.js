// Mở / đóng navbar cho mobile
const bar = document.getElementById('bar');
const nav = document.getElementById('navbar');
const close = document.getElementById('close');

if (bar) {
    bar.addEventListener('click', () => {
        nav.classList.add('active');
    });
}

if (close) {
    close.addEventListener('click', () => {
        nav.classList.remove('active');
    });
}

// Thay đổi hình nền tự động
const heroSection = document.getElementById("hero");
const backgrounds = [
    "img/hero4.png",
    "img/hinh2.png",
    "img/hinh3.png"
];

let currentIndex = 0;

function changeBackground() {
    if (heroSection) {
        currentIndex = (currentIndex + 1) % backgrounds.length;
        heroSection.style.backgroundImage = `url(${backgrounds[currentIndex]})`;
    }
}

const nextBtn = document.getElementById('next-bg');
const prevBtn = document.getElementById('prev-bg');

if (nextBtn && heroSection) {
    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % backgrounds.length;
        heroSection.style.backgroundImage = `url(${backgrounds[currentIndex]})`;
    });
}

if (prevBtn && heroSection) {
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + backgrounds.length) % backgrounds.length;
        heroSection.style.backgroundImage = `url(${backgrounds[currentIndex]})`;
    });
}

setInterval(changeBackground, 5000);

// Rung chữ nếu có highlight-text
const text = document.getElementById("highlight-text");
function triggerShake() {
    if (text) {
        text.classList.add("shake");
        setTimeout(() => {
            text.classList.remove("shake");
        }, 500);
    }
}
if (text) setInterval(triggerShake, 2000);
// Đồng hồ đếm ngược nếu có phần tử countdown
const countdownElement = document.getElementById('countdown');

if (countdownElement) {
    // Đặt ngày ra mắt tại đây (ví dụ: 30/06/2025)
    const launchDate = new Date("2025-05-30T00:00:00").getTime();

    const countdownTimer = setInterval(() => {
        const now = new Date().getTime();
        const distance = launchDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        countdownElement.innerHTML = `${days} ngày ${hours} giờ ${minutes} phút ${seconds} giây`;

        if (distance < 0) {
            clearInterval(countdownTimer);
            countdownElement.innerHTML = "Đã ra mắt!";
        }
    }, 1000);
}

// JavaScript cho biểu tượng mắt sử dụng jQuery
$(document).ready(function () {
    $('.eye').click(function () {
        $(this).toggleClass('open');
        $(this).children('i').toggleClass('fa-eye-slash fa-eye');
        const input = $(this).prev();
        if ($(this).hasClass('open')) {
            input.attr('type', 'text');
        } else {
            input.attr('type', 'password');
        }
    });
});

// Xử lý login nếu có form-login
const loginForm = document.getElementById('form-login');
if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const username = document.querySelector('#form-login .form-input[type="text"]').value.trim();
        const password = document.querySelector('#form-login .form-input[type="password"]').value;

        const loginErrorMsg = document.getElementById('login-error-message');
        const loginFailMsg = document.getElementById('login-fail-message');
        const loginSuccessMsg = document.getElementById('login-success-message');

        loginErrorMsg.style.display = 'none';
        loginFailMsg.style.display = 'none';
        loginSuccessMsg.style.display = 'none';

        if (username === '' || password === '') {
            loginErrorMsg.style.display = 'block';
            return;
        }

        const storedUser = localStorage.getItem('registeredUser');
        const storedPass = localStorage.getItem('registeredPass');

        if (username === storedUser && password === storedPass) {
            loginSuccessMsg.style.display = 'block';
            setTimeout(function () {
                window.location.href = 'index.html';
            }, 2000);
        } else {
            loginFailMsg.style.display = 'block';
        }
    });

    document.querySelectorAll('#form-login .form-input').forEach(input => {
        input.addEventListener('input', () => {
            document.getElementById('login-error-message').style.display = 'none';
            document.getElementById('login-fail-message').style.display = 'none';
        });
    });
}

// Xử lý register nếu có form-register
const registerForm = document.getElementById('form-register');
if (registerForm) {
    registerForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const inputs = document.querySelectorAll('#form-register .form-input');
        const username = inputs[0].value.trim();
        const password = inputs[1].value;
        const confirmPassword = inputs[2].value;

        const emptyMsg = document.getElementById('empty-message');
        const errorMsg = document.getElementById('error-message');
        const successMsg = document.getElementById('success-message');

        emptyMsg.style.display = 'none';
        errorMsg.style.display = 'none';
        successMsg.style.display = 'none';

        if (username === '' || password === '' || confirmPassword === '') {
            emptyMsg.style.display = 'block';
            return;
        }

        if (password !== confirmPassword) {
            errorMsg.style.display = 'block';
            return;
        }

        localStorage.setItem('registeredUser', username);
        localStorage.setItem('registeredPass', password);

        successMsg.style.display = 'block';
        // Chờ 3 giây để người dùng đọc thông báo rồi mới chuyển trang
        setTimeout(function () {
            window.location.href = 'login.html';
        }, 3000);
    });

    document.querySelectorAll('#form-register .form-input').forEach(input => {
        input.addEventListener('input', () => {
            document.getElementById('empty-message').style.display = 'none';
            document.getElementById('error-message').style.display = 'none';
        });
    });
}
