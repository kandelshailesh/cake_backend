const app = require('express')();
const bcrypt = require('bcrypt');
const Subcategory = require('../../src/Inventory/product_subcategory');
const verify_token = require('../../middlewares/verify_token');


app.post('/subcategory/create', verify_token, Subcategory.createSubcategory);
app.get('/subcategory/list', verify_token, Subcategory.displaySubcategory);
app.put('/subcategory/update', verify_token, Subcategory.updateSubcategory);
app.delete('/subcategory/delete', verify_token, Subcategory.deleteSubcategory);


module.exports = app;

