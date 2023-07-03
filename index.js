const express = require('express');
const cors = require('cors');
// no hace falta ponerle index, automaticamente ejecuta el index
const routerApi = require('./routes');

const { logError, errorHandler, boomErrorHandler } = require('./middlewares/errorHandler');

const app = express();
const port = 3000;

const whitelist = ['http://localhost:8080', 'https://myapp.com'];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin))
      callback(null, true);
    else
      callback(new Error('no permitido'));

  }
};
app.use(cors(options));

// middleware para que pueda leer archivos json enviados por POST
app.use(express.json());

routerApi(app);

app.use(logError);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log('Mi port es ' + port);
});

