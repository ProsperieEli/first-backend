const { Router } = require('express');
const { insert } = require('../models/Order');
const Order = require('../models/Order');
const pool = require('../utils/pool');

module.exports = Router()
  .post('/', async (req, res) => {
    const order = await Order.insert({
      product: req.body.product,
      quantity: req.body.quantity,
    });

    res.json(order);
  })

  .get('/:id', async (req, res) => {
    const { id } = req.params;

    const orders = await Order.getById(id);

    res.json(orders);
  })

  .get('/', async (req, res) => {
    const orders = await Order.getAll();

    res.json(orders);
  })

  .patch('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      await Order.getById(id);
      const orders = await Order.updateById(id, {
        product: req.body.product,
        quantity: req.body.quantity,
      });

      res.json(orders);
    } catch (error) {
      next(error);
    }
  })

  .delete('/:id', async (req, res) => {
    const { id } = req.params;
    const orders = await Order.deleteById(id);

    res.json(orders);
  });
