const app = require('express')();
const bcrypt = require('bcrypt');
const Order = require('../../src/Orders/orders');
const verify_token = require('../../middlewares/verify_token');

app.post('/order/create', verify_token, Order.createOrder);
app.post('/order/list', verify_token, Order.displayOrder);
app.post('/order/list_pending', verify_token, Order.displayPendingOrder);
app.post('/order/list_delivered', verify_token, Order.displayDeliveredOrder);
app.post('/order/list_cancelled', verify_token, Order.displayCancelledOrder);
app.put('/order/delivered', verify_token, Order.deliverOrder);
app.put('/order/cancelled', verify_token, Order.cancelOrder);
app.post('/order/dashboard', verify_token, Order.dashBoardByToday);
app.post('/order/dashboard_date', verify_token, Order.dashBoardByDate);

module.exports = app;
