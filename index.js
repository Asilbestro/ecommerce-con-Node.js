const express = require('express');

// no hace falta ponerle index, automaticamente ejecuta el index
const routerApi = require('./routes');

const app = express();
const port = 3000;

// middleware para que pueda leer archivos json enviados por POST
app.use(express.json());

app.listen(port, () => {
  console.log('Mi port es ' + port);
});

routerApi(app);
