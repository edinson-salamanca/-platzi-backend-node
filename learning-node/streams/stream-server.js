const fs = require('fs');
const http = require('http');
const server = http.createServer();

server.on('request', (req, res) => {
  /**
   * lee el archivo como un stream, que permite
   * leerlo por lotes  o fracciones, reduciendo
   * el uso de memoria 
   * el tamaño del chunk por defecto es de 64kb
   * para un fs, para un stream normal es de 16kb
   */
  const src = fs.createReadStream('./big');

  /**
   * la función de 'pipe()' es limitar el
   * almacenamiento en buffer de datos a niveles
   * aceptables de modo que no se sobrecargue la
   * memoria disponible.
   */
  src.pipe(res);
});

server.listen(3000);
