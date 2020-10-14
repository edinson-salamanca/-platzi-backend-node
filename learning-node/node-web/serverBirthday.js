const http = require('http');
const server = http.createServer();

const dayWeeks = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];
server.on('request', (req, res) => {
  if (req.method === 'POST' && req.url === '/birthday') {
    let body = [];
    req
      .on('data', (chunk) => {
        body.push(chunk);
      })
      .on('end', () => {
        res.writeHead(200, {
          'Content-Type': 'text/plain',
        });
        body = Buffer.concat(body).toString();
        try {
          // mm/dd/yyy
          const date = new Date(body);
          const day = dayWeeks[date.getUTCDay()];
          res.end(day);
        } catch (excep) {
          res.end('invalid Date');
        }
      });
  } else {
    res.statusCode = 404;
    res.end();
  }
});

server.listen(8002);
console.log('servidor corriendo en el puerto 8002');
