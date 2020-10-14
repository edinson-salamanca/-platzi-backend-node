const fs = require('fs');
const file = fs.createWriteStream('./big');

for (let i = 0; i <= 1e6; i++) {
  file.write(
    'Más específicamente, Microsoft dice que se resolvió una posible elevación de privilegios en win32k, y esto solo hace que la actualización acumulativa KB4579311 sea un parche crítico que los usuarios deben instalar. Además, la misma actualización resuelve un problema con la creación de puertos nulos mediante la interfaz de usuario'
  );
}

file.end();
