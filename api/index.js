const express = require('express');
// no hace falta ponerle index, automaticamente ejecuta el index
const routerApi = require('./routes');
const cors = require('cors');

const { logError, errorHandler, boomErrorHandler } = require('./middlewares/errorHandler');

const app = express();
const port = process.env.PORT || 3000;

const whitelist = [' http://localhost:3000/', 'http://127.0.0.1:5500/frontend.html', 'http://localhost:3000/'];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || origin)
      callback(null, true);
    else
      callback(new Error('no permitido'));

  }
};
app.use(cors(options));

routerApi(app);

app.get('/api', (req, res) => {
  res.send('Bienvenido a mi servidor en express');
});

// middleware para que pueda leer archivos json enviados por POST
app.use(express.json());



app.use(logError);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log('Mi port es ' + port);
});

