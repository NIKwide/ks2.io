let tg = window.Telegram.WebApp;

tg.expand();

tg.MainButton.textColor = '#FFFFFF';
tg.MainButton.color = '#2cab37';

document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".nav-button");
    const sections = document.querySelectorAll(".section");
    const contentContainer = document.querySelector('.content');

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            // Remove active class from all buttons
            buttons.forEach(btn => btn.classList.remove("active"));
            // Add active class to clicked button
            button.classList.add("active");

            // Get the target section
            const targetId = button.getAttribute("data-target");
            const targetSection = document.getElementById(targetId);

            // Scroll to the target section with animation
            contentContainer.scroll({
                left: targetSection.offsetLeft,
                behavior: "smooth"
            });

            // Scroll the target section to the top after animation ends
            setTimeout(() => {
                targetSection.scrollTo({ top: 0, behavior: "smooth" });
            }, 1); // Adjust the timeout duration based on the animation speed
        });
    });

    // Получение данных пользователя
    tg.ready(() => {
        const userPhoneNumber = tg.initDataUnsafe.user.phone_number;

        // Если номер телефона есть, то продолжаем
        if (userPhoneNumber) {
            generateQRCode(userPhoneNumber);
        } else {
            console.error("Не удалось получить номер телефона пользователя.");
        }
    });
});

function generateQRCode(phoneNumber) {
    // API URL для создания QR-кода
    const apiUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(phoneNumber)}&size=150x150`;

    // Создаем элемент изображения и задаем его src на URL с QR-кодом
    const qrCodeImage = document.createElement('img');
    qrCodeImage.src = apiUrl;
    qrCodeImage.alt = 'QR Code';

    // Добавляем изображение QR-кода в контейнер на странице
    const qrCodeContainer = document.getElementById('qr-code-container');
    qrCodeContainer.appendChild(qrCodeImage);
}
