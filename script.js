const loginForm = document.getElementById('loginForm');
const registrationForm = document.getElementById('registrationForm');
const showRegister = document.getElementById('showRegister');
const showLogin = document.getElementById('showLogin');
const logoutBtn = document.getElementById('logoutBtn');
const welcomeMessage = document.getElementById('welcomeMessage');

// Przełączanie między formularzami
showRegister.addEventListener('click', () => {
    loginForm.style.display = 'none';
    registrationForm.style.display = 'block';
});

showLogin.addEventListener('click', () => {
    registrationForm.style.display = 'none';
    loginForm.style.display = 'block';
});

// ====================
// KONFIGURACJA API
// ====================
const apiUrl = 'https://pwa-backend-b2m2.onrender.com/api/users';
const loginUrl = 'https://pwa-backend-b2m2.onrender.com/api/login';

// ====================
// Funkcja rejestracji
// ====================
const createUser = async (username, password) => {
    if (!username || !password) {
        alert('Proszę wypełnić wszystkie pola.');
        return;
    }

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (!response.ok) throw new Error(data.message);

        alert('Rejestracja zakończona sukcesem!');
        
        registrationForm.style.display = 'none';
        loginForm.style.display = 'block';

        document.getElementById('username').value = '';
        document.getElementById('password').value = '';
        alert('Proszę się teraz zalogować.');
    } catch (error) {
        alert('Błąd: ' + error.message);
    }
};

// ====================
// Funkcja logowania
// ====================
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

        document.getElementById('loginUsername').value = '';
        document.getElementById('loginPassword').value = '';
    } catch (error) {
        alert('Błąd logowania: ' + error.message);
    }
};

// ====================
// Wylogowanie
// ====================
logoutBtn.addEventListener('click', () => {
    loginForm.style.display = 'block';
    registrationForm.style.display = 'none';
    logoutBtn.style.display = 'none';
    welcomeMessage.style.display = 'none';

    document.getElementById('loginUsername').value = '';
    document.getElementById('loginPassword').value = '';

    alert('Zostałeś wylogowany.');
});

// ====================
// Obsługa kliknięć
// ====================
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
