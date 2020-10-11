const app = require('express')();
const bcrypt = require('bcrypt');
const User = require('../../src/User/users');
const verify_token = require('../../middlewares/verify_token');

app.post('/user/register', verify_token, User.createUser);
app.post('/user/login', verify_token, User.loginUser);
app.get('/user/list', verify_token, User.displayUser);
app.put('/user/update', verify_token, User.updateUser);
app.delete('/user/delete', verify_token, User.deleteUser);
app.put('/user/change_password', verify_token, User.changePassword);
app.post('/user/admin_login', verify_token, User.loginAdmin);

module.exports = app;
