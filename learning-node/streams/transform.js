const { Transform } = require('stream');

const transformStream = new Transform({
  transform(chunk, encoding, callback) {
    this.push(chunk.toString().toLowerCase());
    callback();
  },
});

process.stdin.pipe(transformStream).pipe(process.stdout);
