const http = require('http');

http.get('http://localhost:5000/public/demos/juego_arcade.html', (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  res.on('data', () => {});
}).on('error', (e) => {
  console.error(`Got error: ${e.message}`);
});
