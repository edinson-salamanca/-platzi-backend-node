const os = require('os');

console.log('CPU info', os.cpus().length);
console.log('Ip address', os.networkInterfaces());
console.log('Free memory', os.freemem());
console.log('Type', os.type());
console.log('SO versión', os.release());
console.log('Usr info', os.userInfo());
