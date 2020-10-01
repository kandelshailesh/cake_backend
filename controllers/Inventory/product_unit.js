const app = require('express')();
const bcrypt = require('bcrypt');
const Unit = require('../../src/Inventory/product_unit');
const verify_token = require('../../middlewares/verify_token');


app.post('/unit/create', verify_token, Unit.createUnit);
app.get('/unit/list', verify_token, Unit.displayUnit);
app.put('/unit/update', verify_token, Unit.updateUnit);
app.delete('/unit/delete', verify_token, Unit.deleteUnit);


module.exports = app;

