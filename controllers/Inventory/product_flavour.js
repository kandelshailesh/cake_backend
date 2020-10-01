const app = require('express')();
const bcrypt = require('bcrypt');
const Specification = require('../../src/Inventory/product_flavour');
const verify_token = require('../../middlewares/verify_token');


app.post('/flavour/create', verify_token, Specification.createSpecification);
app.get('/flavour/list', verify_token, Specification.displaySpecification);
app.put('/flavour/update', verify_token, Specification.updateSpecification);
app.delete('/flavour/delete', verify_token, Specification.deleteSpecification);


module.exports = app;

