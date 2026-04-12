const express = require('express');
const app = express();

app.get('/ping', (req, res) => {
  res.status(200).send('PONG');
});

// Слушаем строго все сетевые интерфейсы (0.0.0.0), чтобы обойти баги IPv6 на Mac
app.listen(8888, '0.0.0.0', () => {
  console.log('Test server running on port 8888');
});
