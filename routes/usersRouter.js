const express = require('express');
const { faker } = require('@faker-js/faker');

const router = express.Router();

router.get('/', (req, res) => {
  const users = [];
  const { size } = req.query;

  const limit = size || 10;

  for (let index = 0; index < limit; index++) {
    users.push({
      name: faker.person.fullName,
      bio: faker.person.bio,
      phone_number: faker.phone.number,
    });
  }
  res.json(users);
});


router.get('/filter', (req, res) => {
  res.send('Yo soy un filter');
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    id: id,
    name: 'Producto 3',
    price: 799
  });
});

module.exports = router;
