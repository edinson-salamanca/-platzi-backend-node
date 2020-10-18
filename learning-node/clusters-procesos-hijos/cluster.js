const cluster = require('cluster');
const http = require('http');

// Requerimos la cantidad de CPUS que tiene la máquina actual
const NUM_CPUS = require('os').cpus().length;

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Si el cluster es maestro, creamos tantos procesos como número de CPUS

  for (let i = 0; i < NUM_CPUS; i++) {
    cluster.fork();
  }

  // Si por alguna razón el cluster se finanliza hacemos un log
  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  //Los diferentes workers pueden compartir la conexión TCP
  // En este caso es un servidor HTTP
  http
    .createServer((req, res) => {
      res.writeHead(200);
      res.end('hello word\n');
    })
    .listen(8000);
  console.log(`worker ${process.pid} started`);
}
