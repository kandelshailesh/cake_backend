const app = require('express')();
const bcrypt = require('bcrypt');
const Order = require('../../models/Orders/orders');
const OrderItem = require('../../models/Orders/orders_item');
const OrderShape = require('../../models/Orders/orders_shape');
const OrderFlavour = require('../../models/Orders/orders_flavour');
const jwt = require('jsonwebtoken');
const sequelize = require('../../db_config/db');
const db = sequelize.models;

module.exports = {
  displayPendingOrder: async (req, res) => {
    try {
      const order_list = await Order.findAll({
        where: {
          ordered_date: {
            [sequelize.Sequelize.Op.between]: [
              req.body.start_date,
              req.body.end_date,
            ],
          },
        },
      });
      res.status(200).send({ success: true, orderlist: order_list });
    } catch (err) {
      res.status(500).send({ success: false, error: err.message });
    }
  },
  displayPendingOrder: async (req, res) => {
    try {
      const order_list = await Order.findAll({
        where: {
          ordered_date: {
            [sequelize.Sequelize.Op.between]: [
              req.body.start_date,
              req.body.end_date,
            ],
          },
        },
      });
      res.status(200).send({ success: true, orderlist: order_list });
    } catch (err) {
      res.status(500).send({ success: false, error: err.message });
    }
  },
  displayDeliveredOrder: async (req, res) => {
    try {
      const order_list = await Order.findAll({
        where: {
          delivered_date: {
            [sequelize.Sequelize.Op.between]: [
              req.body.start_date,
              req.body.end_date,
            ],
          },
        },
      });
      res.status(200).send({ success: true, orderlist: order_list });
    } catch (err) {
      res.status(500).send({ success: false, error: err.message });
    }
  },
  displayCancelledOrder: async (req, res) => {
    try {
      const order_list = await Order.findAll({
        where: {
          order_status: 'CANCELLED',
        },
      });
      res.status(200).send({ success: true, orderlist: order_list });
    } catch (err) {
      res.status(500).send({ success: false, error: err.message });
    }
  },
  displayOrder: async (req, res) => {
    console.log(req.body);
    try {
      const list_order = await Order.findAll({
        where: {
          ordered_date: {
            [sequelize.Sequelize.Op.between]: [
              new Date(req.body.startdate),
              new Date(req.body.enddate),
            ],
          },
        },
        include: [
          {
            model: db.orders_item,
            include: [
              {
                model: db.inventoryProduct,
                required: false,
              },
              {
                model: db.productFlavour,
                required: false,
              },
              {
                model: db.productShape,
                required: false,
              },
            ],
          },
          { model: db.users },
        ],
      });

      res.send({
        success: true,
        orderlist: list_order,
      });
    } catch (err) {
      res.send({
        success: false,
        message: 'Error in connecting to Order table',
      });
    }
  },
  createOrder: async (req, res) => {
    console.log(req.body);
    try {
      const order = await Order.create(req.body);
      const order_id = order.getDataValue('order_id');
      console.log(order_id);
      const createItem = req.body.order_item.map((result, i) => {
        return { ...result, order_id: order_id };
      });

      const check_id = await OrderItem.bulkCreate(createItem);
      // console.log(check_id);
      // const createFlavour = createItem.map((result, i) => {
      //   return result.flavour.map((result1, j) => {
      //     return {
      //       ...result1,
      //       order_item_id: check_id[i].getDataValue('id'),
      //     };
      //   });
      // });
      // const createShape = createItem.map((result, i) => {
      //   return result.shape.map((result1, j) => {
      //     return {
      //       ...result1,
      //       order_item_id: check_id[i].getDataValue('id'),
      //     };
      //   });
      // });
      // console.log(createShape);
      // console.log(createFlavour);
      // await OrderFlavour.bulkCreate(createFlavour[0]);
      // await OrderShape.bulkCreate(createShape[0]);
      res.send({
        success: true,
        message: 'Order created successfully',
        order_id,
      });
    } catch (err) {
      console.log(err);
      res.status(500).send({
        success: false,
        message: err.message,
      });
    }
  },
  deliverOrder: async (req, res) => {
    try {
      console.log(req.body);
      const findOrder = await Order.findOne({
        where: { order_id: req.body.order_id },
      });
      const delivered_date = new Date();
      await Order.update(
        {
          ...req.body,
          order_status: 'DELIVERED',
          delivered_date: delivered_date,
        },
        { where: { order_id: req.body.order_id } },
      );
      await OrderItem.update(
        { delivered_date: delivered_date },
        { where: { order_id: req.body.order_id } },
      );
      res.send({
        success: true,
        message: 'Order delivered successfully',
      });
    } catch (err) {
      res.status(500).send({
        success: false,
        message: err.message,
      });
    }
  },
  cancelOrder: async (req, res) => {
    try {
      const findOrder = await Order.findOne({
        where: { order_id: req.body.order_id },
      });
      await Order.update(
        { ...req.body, order_status: 'CANCELLED', cancelled_date: new Date() },
        { where: { order_id: req.body.order_id } },
      );
      res.send({
        success: true,
        message: 'Order cancelled successfully',
      });
    } catch (err) {
      res.status(500).send({
        success: false,
        message: 'Unable to deliver',
      });
    }
  },
  dashBoardByToday: async (req, res) => {
    console.log(req.body);
    try {
      var { date } = req.body;
      date = date.split(' ')[0];
      // date = date.split(' ')[0];
      // var date1 = new Date(date).getTimezoneOffset();
      const total_sales = await Order.sum('total_amount', {
        where: {
          order_status: 'DELIVERED',
          delivered_date: sequelize.Sequelize.where(
            sequelize.Sequelize.fn('date', sequelize.col('delivered_date')),
            '=',
            date,
          ),
        },
      });
      const list_item = await OrderItem.findAll({
        where: {
          delivered_date: sequelize.Sequelize.where(
            sequelize.Sequelize.fn('date', sequelize.col('delivered_date')),
            '=',
            date,
          ),
        },
        attributes: [
          'product_id',
          [
            sequelize.Sequelize.fn('sum', sequelize.col('quantity')),
            'total_quantity',
          ],
        ],
        include: [
          {
            model: db.inventoryProduct,
          },
        ],
        group: ['product_id'],
        order: sequelize.literal('total_quantity DESC'),
        limit: 5,
      });

      const total_order = await Order.count({
        where: {
          ordered_date: sequelize.Sequelize.where(
            sequelize.Sequelize.fn('date', sequelize.col('ordered_date')),
            '=',
            date,
          ),
        },
      });
      const total_pending = await Order.count({
        where: { order_status: 'PENDING' },
      });
      const total_deliver = await Order.count({
        where: {
          order_status: 'DELIVERED',
          deliverd_date: sequelize.Sequelize.where(
            sequelize.Sequelize.fn('date', sequelize.col('delivered_date')),
            '=',
            date,
          ),
        },
      });
      const total_cancel = await Order.count({
        where: {
          order_status: 'CANCELLED',
          cancelled_date: {
            [sequelize.Sequelize.Op.between]: [date, date],
          },
        },
      });
      var most_sales = '';
      if (list_item.length > 0) {
        most_sales = {
          name: list_item[0].inventoryProduct.name,
          total_quantity: list_item[0].getDataValue('total_quantity'),
        };
      }

      res.status(200).send({
        success: true,
        total_sales: total_sales,
        most_sales: most_sales,
        list_item: list_item,
        total_order: total_order,
        total_pending: total_pending,
        total_deliver: total_deliver,
        total_cancel: total_cancel,
      });
    } catch (err) {
      console.log(err);
      res.status(500).send({ success: false, message: 'Error occured' });
    }
  },
  dashBoardByDate: async (req, res) => {
    console.log(req.body);
    console.log(new Date(req.body.end_date));
    const { start_date, end_date } = req.body;
    try {
      const total_sales = await Order.sum('total_amount', {
        where: {
          order_status: 'DELIVERED',
          delivered_date: {
            [sequelize.Sequelize.Op.between]: [
              new Date(start_date),
              new Date(end_date),
            ],
          },
        },
      });
      const total_order = await Order.count({
        where: {
          ordered_date: {
            [sequelize.Sequelize.Op.between]: [start_date, end_date],
          },
        },
      });
      const total_pending = await Order.count({
        where: {
          order_status: 'PENDING',
          ordered_date: {
            [sequelize.Sequelize.Op.between]: [start_date, end_date],
          },
        },
      });
      const total_deliver = await Order.count({
        where: {
          order_status: 'DELIVERED',
          delivered_date: {
            [sequelize.Sequelize.Op.between]: [start_date, end_date],
          },
        },
      });
      const total_cancel = await Order.count({
        where: {
          order_status: 'CANCELLED',
          cancelled_date: {
            [sequelize.Sequelize.Op.between]: [start_date, end_date],
          },
        },
      });

      const list_item = await OrderItem.findAll({
        where: {
          delivered_date: {
            [sequelize.Sequelize.Op.between]: [start_date, end_date],
          },
        },
        attributes: [
          'product_id',
          [
            sequelize.Sequelize.fn('sum', sequelize.col('quantity')),
            'total_quantity',
          ],
        ],
        include: [
          {
            model: db.inventoryProduct,
          },
        ],
        group: ['product_id'],
        order: sequelize.literal('total_quantity DESC'),
        limit: 5,
      });
      var most_sales = '';
      if (list_item.length > 0) {
        most_sales = {
          name: list_item[0].inventoryProduct.name,
          total_quantity: list_item[0].getDataValue('total_quantity'),
        };
      }

      res.status(200).send({
        success: true,
        total_sales: total_sales,
        list_item: list_item,
        most_sales: most_sales,
        total_order: total_order,
        total_pending: total_pending,
        total_deliver: total_deliver,
        total_cancel: total_cancel,
      });
    } catch (err) {
      console.log(err);
      res.status(500).send({ success: false, message: 'Error occured' });
    }
  },
  deleteOrder: async (req, res) => {
    try {
      const result = await Order.destroy({
        where: {
          order_id: req.body.order_id,
        },
      });
      if (results === 1) {
        res.json({ success: true, message: 'Order deleted successfully' });
      } else {
        res.status(500).json({ success: false, message: 'Order not found' });
      }
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },
};
