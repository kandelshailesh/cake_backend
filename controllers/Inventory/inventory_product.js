const app = require('express')();
const bcrypt = require('bcrypt');
const Product = require('../../src/Inventory/inventory_product');
const verify_token = require('../../middlewares/verify_token');

app.post('/inventory_product/create', verify_token, Product.createProduct);
app.get('/inventory_product/list', verify_token, Product.displayProduct);
app.get(
  '/inventory_product/list/:id',
  verify_token,
  Product.displayProductByID,
);
app.put('/inventory_product/update', verify_token, Product.updateProduct);
app.delete('/inventory_product/delete', verify_token, Product.deleteProduct);

module.exports = app;
