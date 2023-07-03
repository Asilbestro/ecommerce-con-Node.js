const express = require('express');

const UsersService = require('../services/usersServices');
const validatorHandler = require('../middlewares/validatorHandler');
const { createUserSchema, updateUserSchema, getUserSchema } = require('../schemas/userSchema');

const router = express.Router();
const service = new UsersService();

router.get('/', async (req, res) => {
  const users = await service.find();
  res.json(users);
});

router.get('/:id',
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const users = await service.findOne(id);
      res.json(users);
    } catch (error) {
      // next indica que siga con el próximo middleware que está en el index.js del servidor
      next(error);
    }
  });

router.post('/',
  validatorHandler(createUserSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const newUser = await service.create(body);
    res.json({
      message: 'created',
      newUser
    });
  });

// patch hace lo mismo que el put, pero si tenemos que actualizar un campo de manera parcial, debemos usar patch
router.patch('/:id',
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const updateUser = await service.update(id, body);
      res.json({
        message: 'update',
        updateUser,
      });
    } catch (error) {
      next(error);
    }
  });

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const deleted = await service.delete(id);
  res.json({
    message: "deleted",
    deleted
  });
});

module.exports = router;
