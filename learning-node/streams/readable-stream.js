const { Readable } = require('stream');
const readableStream = new Readable();

//le endicamos que va recibir datos
readableStream.push(`${0 / 0} `.repeat(10).concat('Batman,Bataman'));

//null le indica que no va recibir datos
readableStream.push(null);

/**
 * En este caso el readableStream recibe los datos
 *  y los lleva a la salida estandar del sistema, o (stdout)
 */
readableStream.pipe(process.stdin);
