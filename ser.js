// Sprawdzenie, czy adres URL to 127.0.0.1
if (window.location.hostname === '127.0.0.1') {
  // Przekierowanie na localhost
  window.location.href = 'http://localhost:3000/formula';
}

// Reszta kodu do obsługi formularza
document.querySelector('form').addEventListener('submit', function(event) {
  event.preventDefault(); // Zapobiega domyślnej akcji formularza

  const formData = new FormData(this);

  fetch('/upload', {
      method: 'POST',
      body: formData
  })
  .then(response => response.text())
  .then(data => {
      alert(data); // Wyświetla odpowiedź serwera
  })
  .catch(error => {
      console.error('Błąd:', error);
  });
});