// Przełączanie między formularzami
const loginForm = document.getElementById('loginForm');
const registrationForm = document.getElementById('registrationForm');
const showRegister = document.getElementById('showRegister');
const showLogin = document.getElementById('showLogin');
const logoutBtn = document.getElementById('logoutBtn');
const welcomeMessage = document.getElementById('welcomeMessage');

// Obsługa przełączania formularzy
showRegister.addEventListener('click', () => {
    loginForm.style.display = 'none';
    registrationForm.style.display = 'block';
});

showLogin.addEventListener('click', () => {
    registrationForm.style.display = 'none';
    loginForm.style.display = 'block';
});

// Funkcja rejestracji
const apiUrl = 'https://pwa-backend-b2m2.onrender.com/register';

const createUser = async (username, password) => {
    if (!username || !password) {
        alert('Proszę wypełnić wszystkie pola.');
        return;
    }

    try {
        const response = await fetch('https://pwa-backend-b2m2.onrender.com', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (!response.ok) throw new Error(data.message);

        alert('Rejestracja zakończona sukcesem!');
        
        // Ukryj formularz rejestracji i przełącz na formularz logowania
        registrationForm.style.display = 'none';
        loginForm.style.display = 'block';
        
        // Zresetuj pola rejestracji
        document.getElementById('username').value = '';
        document.getElementById('password').value = '';

        // Poinformuj użytkownika, że może teraz się zalogować
        alert('Proszę się teraz zalogować.');
    } catch (error) {
        alert('Błąd: ' + error.message);
    }
};

// Funkcja logowania
const loginUrl = 'https://pwa-backend-b2m2.onrender.com/login';

const loginUser = async (username, password) => {
    if (!username || !password) {
        alert('Proszę wypełnić wszystkie pola.');
        return;
    }

    try {
        const response = await fetch(loginUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (!response.ok) throw new Error(data.message);

        alert('Zalogowano pomyślnie!');
        loginForm.style.display = 'none';
        registrationForm.style.display = 'none';
        logoutBtn.style.display = 'block';
        welcomeMessage.textContent = `Witaj, ${username}!`;
        welcomeMessage.style.display = 'block';

        // Wyczyść pola logowania
        document.getElementById('loginUsername').value = '';
        document.getElementById('loginPassword').value = '';
    } catch (error) {
        alert('Błąd logowania: ' + error.message);
    }
};

// Obsługa przycisku wylogowania
logoutBtn.addEventListener('click', () => {
    loginForm.style.display = 'block';
    registrationForm.style.display = 'none';
    logoutBtn.style.display = 'none';
    welcomeMessage.style.display = 'none';

    // Wyczyść pola logowania
    document.getElementById('loginUsername').value = '';
    document.getElementById('loginPassword').value = '';

    alert('Zostałeś wylogowany.');
});

// Obsługa kliknięć przycisków
document.getElementById('loginButton').addEventListener('click', () => {
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    loginUser(username, password);
});

document.getElementById('registerButton').addEventListener('click', () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    createUser(username, password);
});
