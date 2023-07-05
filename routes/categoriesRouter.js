const express = require('express');

const CategoriesService = require('../services/categoriesService');
const validatorHandler = require('../middlewares/validatorHandler');
const { createCategorySchema, updateCategorySchema, getCategorySchema } = require('../schemas/categorySchema');

const router = express.Router();
const service = new CategoriesService();


router.get('/', async (req, res) => {
  const categories = await service.find();
  res.json(categories);
});

router.get('/:id',
  validatorHandler(getCategorySchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const category = await service.findOne(id);
      res.json(category);
    } catch (error) {
      next(error);
    }
  });


router.post('/',
  validatorHandler(createCategorySchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const newCategory = await service.create(body);
    res.json({
      message: 'created',
      newCategory
    });
  });

// patch hace lo mismo que el put, pero si tenemos que actualizar un campo de manera parcial, debemos usar patch
router.patch('/:id',
  validatorHandler(getCategorySchema, 'params'),
  validatorHandler(updateCategorySchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const update = await service.update(id, body);
      res.json({
        message: 'update',
        update,
        data: body,
        id,
      });
    } catch (error) {
      // next indica que siga con el próximo middleware que está en el index.js del servidor
      next(error);
    }
  });

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const deleted = await service.delete(id);
  res.json({
    message: 'deleted',
    deleted,
  });
});

module.exports = router;
