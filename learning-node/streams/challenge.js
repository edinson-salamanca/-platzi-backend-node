/**
 * Crear una función en node
 * que reciba una cadena de texto
 * y la convierta en camel case usando
 * streams
 */

const { Transform } = require('stream');

class CamelStream extends Transform {
  constructor() {
    super({
      transform(chunk, encoding, callback) {
        let wordsWithoutSpace = chunk.toString().split(' ');

        let camalCase = wordsWithoutSpace.map((item, index) =>
          index === 0
            ? lowerCase(item.charAt(0)).concat(lowerCase(item.slice(1)))
            : upperCase(item.charAt(0)).concat(lowerCase(item.slice(1)))
        );

        camalCase.forEach((item) => this.push(item.toString()));
        callback();
      },
    });
  }

  run() {
    process.stdin.pipe(this).pipe(process.stdout);
  }
}

const upperCase = (string) => string.toUpperCase();
const lowerCase = (string) => string.toLowerCase();

const camelStream = new CamelStream();
camelStream.run();
//process.stdin.pipe(camelStream).pipe(process.stdout);
