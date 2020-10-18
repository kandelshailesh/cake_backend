const app = require('express')();
const bcrypt = require('bcrypt');
const Shape = require('../../src/Inventory/product_shape');
const verify_token = require('../../middlewares/verify_token');

app.post('/shape/create', verify_token, Shape.createSpecification);
app.get('/shape/list', Shape.displaySpecification);
app.put('/shape/update', verify_token, Shape.updateSpecification);
app.delete('/shape/delete', verify_token, Shape.deleteSpecification);

module.exports = app;
