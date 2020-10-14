const { Writable } = require('stream');

const writableStream = new Writable({
  /**
   * 
   * @param {*} chunk 
   * fracciones de datos que van llegando
   * @param {*} encoding 
   * define la codificación que se vaya usar, es opcional
   * @param {*} callback 
   * indica cuando se termina le proceso
   */
  write(chunk, encoding, callback) {
    console.log(chunk.toString());
    callback();
  },
});

process.stdin.pipe(writableStream);
