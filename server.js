const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Konfiguracja multer do przechowywania plików
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'upload/'); // Katalog, w którym będą przechowywane pliki
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unikalna nazwa pliku
    }
});

const upload = multer({ storage: storage });

// Trasa do strony głównej
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html'); // Upewnij się, że masz plik index.html
});

// Trasa do formularza
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/formula.html'); // Upewnij się, że masz plik formula.html
});

// Endpoint do obsługi przesyłania formularza
app.post('/upload', upload.single('file'), (req, res) => {
    const { firstName, lastName, address } = req.body; // Odczytanie danych z formularza
    const file = req.file; // Odczytanie przesłanego pliku

    // Sprawdzenie, czy plik został przesłany
    if (!file) {
        return res.status(400).send('Plik nie został przesłany.'); // Zwrócenie błędu, jeśli plik nie został przesłany
    }

    // Logika do przetwarzania danych
    console.log(`Imię: ${firstName}, Nazwisko: ${lastName}, Adres: ${address}, Plik: ${file.filename}`);

    // Odpowiedź po pomyślnym przesłaniu
    res.send('Dane zostały przesłane pomyślnie!: ' + req.file.filename);
});

// Uruchomienie serwera
app.listen(PORT, () => {
    console.log(`Serwer działa na http://localhost:${PORT}`);
});