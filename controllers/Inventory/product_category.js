const app = require('express')();
const bcrypt = require('bcrypt');
const Category = require('../../src/Inventory/product_category');
const verify_token = require('../../middlewares/verify_token');

app.post('/category/create', verify_token, Category.createCategory);
app.get('/category/list', Category.displayCategory);
app.put('/category/update', verify_token, Category.updateCategory);
app.delete('/category/delete', verify_token, Category.deleteCategory);

module.exports = app;
