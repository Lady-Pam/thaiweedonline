const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware do parsowania danych formularza
app.use(express.urlencoded({ extended: true }));

// Middleware do obsługi statycznych plików (CSS, JS)
app.use(express.static(path.join(__dirname))); // Umożliwia dostęp do plików w katalogu głównym

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

// Trasa do formularza
app.get('/formula', (req, res) => {
    res.sendFile(path.join(__dirname, 'formula.html')); // Wysłać plik formula.html
});

// Endpoint do obsługi przesyłania formularza
app.post('/upload', upload.single('file'), (req, res) => {
    const { firstName, lastName, address } = req.body;
    const file = req.file;

    if (!file) {
        return res.status(400).send('Plik nie został przesłany.');
    }

    console.log(`Name: ${firstName}, Surname: ${lastName}, Address: ${address}, Plik: ${file.filename}`);
    res.send('Dane zostały przesłane pomyślnie!: ' + req.file.filename);
});

// Uruchomienie serwera
app.listen(PORT, () => {
    console.log(`Serwer działa na http://localhost:${PORT}`);
});