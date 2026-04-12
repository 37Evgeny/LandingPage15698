const http = require('http');

const server = http.createServer((req, res) => {
  console.log(`Получен запрос: ${req.url}`);
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('PURE NODE IS WORKING!\n');
});

// НАПИШИ СЮДА ЦИФРЫ: 127 точка 0 точка 0 точка 1
server.listen(8888, '127.0.0.1', () => {
  console.log('Голый Node.js сервер запущен на порту 8888');
});
