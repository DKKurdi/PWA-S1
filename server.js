const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4000;

// Połączenie z MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.set('strictQuery', true);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Błąd połączenia z MongoDB:'));
db.once('open', () => {
    console.log('Połączono z MongoDB.');
});

// Schemat użytkownika
const userSchema = new mongoose.Schema({
    username: String,
    password: String
});
const User = mongoose.model('User', userSchema);

// Middleware
app.use(cors());
app.use(bodyParser.json());

// 🔹 Serwowanie plików statycznych (HTML, CSS, JS, itp.)
app.use(express.static(__dirname));

// 🔹 Endpoint do serwowania index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// 🔹 Rejestracja
app.post('/api/users', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Wypełnij wszystkie pola.' });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
        return res.status(400).json({ message: 'Użytkownik już istnieje.' });
    }

    const newUser = new User({ username, password });
    await newUser.save();

    res.status(201).json({ message: 'Użytkownik zarejestrowany.' });
});

// 🔹 Logowanie
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).json({ message: 'Nieprawidłowa nazwa użytkownika.' });
        }

        if (user.password !== password) {
            return res.status(401).json({ message: 'Nieprawidłowe hasło.' });
        }

        res.status(200).json({ message: 'Zalogowano pomyślnie.' });
    } catch (error) {
        console.error('Błąd podczas logowania:', error);
        res.status(500).json({ message: 'Wystąpił błąd serwera.' });
    }
});

// Start serwera
app.listen(PORT, () => {
    console.log(`Serwer działa na porcie ${PORT}`);
});
