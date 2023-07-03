const express = require('express');

const ProductsService = require('../services/productService');
const validatorHandler = require('../middlewares/validatorHandler');
const { createProductSchema, updateProductSchema, getProductSchema } = require('../schemas/productSchema');

const router = express.Router();
const service = new ProductsService();

router.get('/', async (req, res) => {
  const products = await service.find();
  res.json(products);
});

router.get('/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await service.findOne(id);
      res.json(product);
    } catch (error) {
      // next indica que siga con el próximo middleware que está en el index.js del servidor
      next(error);
    }
  });

router.post('/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const newProducts = await service.create(body);
    res.json({
      message: 'created',
      newProducts,
    });
  });

// patch hace lo mismo que el put, pero si tenemos que actualizar un campo de manera parcial, debemos usar patch
router.patch('/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const editProduct = await service.update(id, body);
      res.json({
        message: 'update',
        editProduct,
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
    message: "deleted",
    deleted,
  });
});

module.exports = router;

