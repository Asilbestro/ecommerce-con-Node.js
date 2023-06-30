const express = require('express');

const UsersService = require('../services/usersServices');

const router = express.Router();
const service = new UsersService();

router.get('/', (req, res) => {
  const users = service.find();
  res.json(users);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const users = service.findOne(id);
  res.json(users);
});

router.post('/', (req, res) => {
  const body = req.body;
  const newUser = service.create(body);
  res.json({
    message: 'created',
    newUser
  });
});

// patch hace lo mismo que el put, pero si tenemos que actualizar un campo de manera parcial, debemos usar patch
router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const updateUser = service.update(id, body);
  res.json({
    message: 'update',
    updateUser,
    data: body,
    id,
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const deleted = service.delete(id);
  res.json({
    message: 'deleted',
    deleted
  });
});


module.exports = router;
