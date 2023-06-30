const express = require('express');
// const { faker } = require('@faker-js/faker');

const router = express.Router();

//Generar una categoría aleatoria;
const categories = [
  {
    name: 'Electronics',
  },
  {
    name: 'Clothing',
  },
  {
    name: 'Books',
  },
  {
    name: 'Home & Kitchen'
  }
];

router.get('/', (req, res) => {

  res.json(categories);
});

router.get('/filter', (req, res) => {
  res.send("<h1>Soy una nueva ruta dentro del servidor</h1>");
});

router.get('/:id', (req, res) => {
  const { limit, offset } = req.query;

  if (limit && offset) {
    res.json({
      limit,
      offset
    });
  } else {
    res.send('No hay parámetros');
  }
});

module.exports = router;
