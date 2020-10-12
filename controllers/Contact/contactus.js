const app = require('express')();
const bcrypt = require('bcrypt');
const Contact = require('../../src/Contactus/contactus');
const verify_token = require('../../middlewares/verify_token');

app.post('/contact/create', verify_token, Contact.createContact);
app.get('/contact/list', verify_token, Contact.displayContact);
app.put('/contact/update', verify_token, Contact.updateContact);
app.delete('/contact/delete', verify_token, Contact.deleteContact);

module.exports = app;
