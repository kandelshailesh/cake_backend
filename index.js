const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const glob = require('glob');
const path = require('path');
const port = process.env.PORT || 8020;
const sequelize = require('./db_config/db');
const error_handler = require('./middlewares/error_handler');
const fs = require('fs');
const debug =require('debug')('shailesh');
const app = express();
app.set('trust proxy',true);
app.use(morgan('dev'));
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {
  flags: 'a',
});

// setup the logger
//app.use(morgan('combined', { stream: accessLogStream }));
//app.use(morgan('tiny'));

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// models relation
const Inventory_Relation = require('./models/Inventory/inventory_relation');
const Order_Relation = require('./models/Orders/orders_relation');

Inventory_Relation.relation();
Order_Relation.relation();

glob.sync('./controllers/**/*.js').map(function (file) {
  app.use('/', require(path.resolve(file)));
});
glob.sync('./controllers/**/**/*.js').map(function (file) {
  app.use('/', require(path.resolve(file)));
});
app.use(error_handler);

app.all('*', (req, res, next) => {
  res.status(404).json({ message: 'Page not found' });
});

sequelize
  .sync({ force: false })
  .then(() => {
    console.log('DB connected successfully');

    app.listen(port, () => {
      console.log('Listening on port ', port);
    });
	debug('Hello from debug');
  })
  .catch(err => {
    console.log(err);
  });
