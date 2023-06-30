const express = require('express');

const CategoriesService = require('../services/categoriesService');

const router = express.Router();
const service = new CategoriesService();


router.get('/', (req, res) => {
  const categories = service.find();
  res.json(categories);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const category = service.findOne(id);

  res.json(category);
});


router.post('/', (req, res) => {
  const body = req.body;
  const newCategory = service.create(body);
  res.json({
    message: 'created',
    newCategory
  });
});

// patch hace lo mismo que el put, pero si tenemos que actualizar un campo de manera parcial, debemos usar patch
router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const update = service.update(id, body);
  res.json({
    message: 'update',
    update,
    data: body,
    id,
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const deleted = service.delete(id);
  res.json({
    message: 'deleted',
    deleted,
    id,
  });
});

module.exports = router;
