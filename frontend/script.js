const loginForm = document.getElementById('loginForm');
const registrationForm = document.getElementById('registrationForm');
const showRegister = document.getElementById('showRegister');
const showLogin = document.getElementById('showLogin');
const logoutBtn = document.getElementById('logoutBtn');
const welcomeMessage = document.getElementById('welcomeMessage');

showRegister.addEventListener('click', (e) => {
  e.preventDefault();
  loginForm.style.display = 'none';
  registrationForm.style.display = 'flex';
});

showLogin.addEventListener('click', (e) => {
  e.preventDefault();
  registrationForm.style.display = 'none';
  loginForm.style.display = 'flex';
});

const apiUrl = 'http://localhost:3000/api/users';
const loginUrl = 'http://localhost:3000/api/login';

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
    registrationForm.reset();
    registrationForm.style.display = 'none';
    loginForm.style.display = 'flex';
  } catch (error) {
    alert('Błąd: ' + error.message);
  }
};

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
    loginForm.reset();
    loginForm.style.display = 'none';
    registrationForm.style.display = 'none';
    logoutBtn.style.display = 'block';
    welcomeMessage.textContent = `Witaj, ${username}!`;
    welcomeMessage.style.display = 'block';
  } catch (error) {
    alert('Błąd logowania: ' + error.message);
  }
};

logoutBtn.addEventListener('click', () => {
  loginForm.reset();
  loginForm.style.display = 'flex';
  registrationForm.style.display = 'none';
  logoutBtn.style.display = 'none';
  welcomeMessage.style.display = 'none';
  welcomeMessage.textContent = '';
  alert('Zostałeś wylogowany.');
});

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
