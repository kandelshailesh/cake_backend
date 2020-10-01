const app = require('express')();
const bcrypt = require('bcrypt');
const Specification = require('../../src/Inventory/inventory_product_flavour');
const verify_token = require('../../middlewares/verify_token');

app.post('/ipf/create', verify_token, Specification.createInvProduct_Flavour);
app.get('/ipf/list', verify_token, Specification.displayInvProduct_Flavour);
app.put('/ipf/update', verify_token, Specification.updateInvProduct_Flavour);
app.delete('/ipf/delete', verify_token, Specification.deleteInvProduct_Flavour);


module.exports = app;

