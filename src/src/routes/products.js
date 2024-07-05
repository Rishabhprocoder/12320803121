const express = require('express');
const { fetchProducts, fetchProductDetails } = require('../services/ecommerceService');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

router.get('/categories/:categoryname/products', async (req, res) => {
  try {
    const { categoryname } = req.params;
    const { n, page, sort, order } = req.query;
    const products = await fetchProducts(categoryname, n, page, sort, order);
    const response = products.map(product => ({ ...product, id: uuidv4() }));
    res.json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/categories/:categoryname/products/:productid', async (req, res) => {
  try {
    const { categoryname, productid } = req.params;
    const product = await fetchProductDetails(categoryname, productid);
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
