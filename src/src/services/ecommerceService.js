const axios = require('axios');
const { ecomAPIs } = require('../config');

const fetchProducts = async (category, n, page = 1, sort, order) => {
  const responses = await Promise.all(ecomAPIs.map(api => 
    axios.get(`${api}/categories/${category}/products`, {
      params: { limit: n, page, sort, order }
    })
  ));
  return responses.flatMap(response => response.data);
};

const fetchProductDetails = async (category, productId) => {
  for (const api of ecomAPIs) {
    try {
      const response = await axios.get(`${api}/categories/${category}/products/${productId}`);
      return response.data;
    } catch (error) {
      // Continue to next API if product not found
    }
  }
  throw new Error('Product not found');
};

module.exports = { fetchProducts, fetchProductDetails };
