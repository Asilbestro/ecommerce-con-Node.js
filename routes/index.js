const express = require('express');

const productsRouter = require('./productsRouter');
const usersRouter = require('./usersRouter');
const categoriesRouter = require('./categoriesRouter');

function routerApi(app) {
  const router = express.Router();
  // hacemos esta variable para que sea mas simple y mas limpio las rutas, y no tengamos que poner 'api/v1/ruta en cada ruta
  app.use('/api/v1', router);

  router.use('/products', productsRouter);
  router.use('/users', usersRouter);
  router.use('/categories', categoriesRouter);
}

module.exports = routerApi;
