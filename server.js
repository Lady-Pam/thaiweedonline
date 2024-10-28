const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Konfiguracja multer do przechowywania plików
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Katalog, w którym będą przechowywane pliki
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unikalna nazwa pliku
    }
});

const upload = multer({ storage: storage });
// Trasa do formularza
app.get('/formula', (req, res) => {
    res.sendFile(__dirname + '/formula.html'); // Upewnij się, że masz plik formularz.html
  });
// Trasa do formularza

// Endpoint do obsługi przesyłania formularza
app.post('/upload', upload.single('file'), (req, res) => {
    const { firstName, lastName, address } = req.body;
    const file = req.file;

    if (!file) {
        return res.status(400).send('File not uploaded.');
    }

    // Możesz tutaj dodać logikę do przetwarzania danych
    console.log(`First name: ${firstName}, Last name: ${lastName}, Address: ${address}, File: ${file.filename}`);

    res.send('Data has been sent successfully!: ' + req.file.filename);
});


// Uruchomienie serwera
app.listen(PORT, () => {
    console.log(`Server works on http://localhost:${PORT}`);
});