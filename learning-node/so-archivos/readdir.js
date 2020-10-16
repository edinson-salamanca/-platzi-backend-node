const fs = require('fs');

const file = fs.readdir(__dirname, (err, files) => {
  if (err) {
    return console.log(err);
  }
  console.log(files)
});
