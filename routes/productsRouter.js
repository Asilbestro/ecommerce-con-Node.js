const express = require('express');

const ProductsService = require('../services/productService');

const router = express.Router();
const service = new ProductsService();

router.get('/', (req, res) => {
  const products = service.find();
  res.json(products);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const product = service.findOne(id);
  res.json(product);
});

router.post('/', (req, res) => {
  const body = req.body;
  const newProducts = service.create(body);
  res.json({
    message: 'created',
    newProducts,
  });
});

// patch hace lo mismo que el put, pero si tenemos que actualizar un campo de manera parcial, debemos usar patch
router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const editProduct = service.update(id, body);
  res.json({
    message: 'update',
    editProduct,
    data: body,
    id,
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const products = service.delete(id);
  res.json({
    message: "deleted",
    products,
  });
});

module.exports = router;

