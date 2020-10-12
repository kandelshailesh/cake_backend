const app = require('express')();
const bcrypt = require('bcrypt');
const Product = require('../../models/Inventory/inventory_product');
const Subcategory = require('../../models/Inventory/product_subcategory');
const Category = require('../../models/Inventory/product_category');
const Unit = require('../../models/Inventory/product_unit');
const Flavour = require('../../models/Inventory/product_flavour');
const Product_Flavour = require('../../models/Inventory/inventory_product_flavour');
const Shape = require('../../models/Inventory/product_shape');
const Product_Shape = require('../../models/Inventory/inventory_product_shape');
var base64Img = require('base64-img');

const checkProduct = name => {
  console.log(name);
  return new Promise((resolve, reject) => {
    Product.findAll({
      where: {
        name: name,
      },
    })
      .then(results => {
        console.log(results);
        if (results.length === 0) {
          resolve(1);
        } else {
          resolve(0);
        }
      })
      .catch(err => {
        console.log(err);
        reject(new Error('Error in creating product'));
      });
  });
};

module.exports = {
  displayProduct: (req, res) => {
    Product.findAll({
      include: [
        {
          model: Subcategory,
          include: { model: Category },
        },
        { model: Unit },
        { model: Product_Shape, required: false, include: { model: Shape } },
        {
          model: Product_Flavour,
          required: false,
          include: { model: Flavour },
        },
      ],
    })
      .then(result => {
        res.send({
          success: true,
          productlist: result,
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).send({
          success: false,
          message: 'Error in connecting to table',
        });
      });
  },
  displayProductBySubCategory: (req, res) => {
    console.log(req.body);
    if (Number(req.body.subcategory_id) > 0) {
      Product.findAll({
        where: {
          subcategory_id: req.body.subcategory_id,
        },
        include: [
          {
            model: Subcategory,
            include: { model: Category },
          },
          { model: Unit },
          { model: Product_Shape, required: false, include: { model: Shape } },
          {
            model: Product_Flavour,
            required: false,
            include: { model: Flavour },
          },
        ],
      })
        .then(result => {
          res.send({
            success: true,
            productlist: result,
          });
        })
        .catch(err => {
          console.log(err);
          res.status(500).send({
            success: false,
            message: 'Error in connecting to table',
          });
        });
    } else {
      Product.findAll({
        include: [
          {
            model: Subcategory,
            include: { model: Category },
          },
          { model: Unit },
          { model: Product_Shape, required: false, include: { model: Shape } },
          {
            model: Product_Flavour,
            required: false,
            include: { model: Flavour },
          },
        ],
      })
        .then(result => {
          res.send({
            success: true,
            productlist: result,
          });
        })
        .catch(err => {
          console.log(err);
          res.status(500).send({
            success: false,
            message: 'Error in connecting to table',
          });
        });
    }
  },
  displayProductByID: (req, res) => {
    Product.findAll({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: Subcategory,
          include: { model: Category },
        },
        { model: Unit },
        { model: Product_Shape, required: false, include: { model: Shape } },
        {
          model: Product_Flavour,
          required: false,
          include: { model: Flavour },
        },
      ],
    })
      .then(result => {
        res.send({
          success: true,
          productlist: result,
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).send({
          success: false,
          message: 'Error in connecting to table',
        });
      });
  },
  createProduct: (req, res) => {
    checkProduct(req.body.name)
      .then(result => {
        // console.log(req.body.flavourlist.length);
        if (result === 1) {
          if (req.body.imagebase) {
            base64Img.img(
              req.body.imagebase,
              'uploads',
              req.body.name.toLowerCase().split(' ').join(''),
              function (err, filepath) {
                console.log(filepath);
                req.body.image = filepath;
              },
            );
          } else {
            req.body.image = null;
          }
          Product.create(req.body)
            .then(result => {
              console.log(result.id);
              const flavourlist = [];
              const shapelist = [];

              if (req.body.flavourid.length > 0) {
                req.body.flavourid.forEach((specification, i) => {
                  flavourlist.push({
                    product_id: result.id,
                    flavour_id: specification,
                  });
                });
                req.body.shapeid.forEach((shape, i) => {
                  shapelist.push({ product_id: result.id, shape_id: shape });
                });
                Promise.all([
                  Product_Flavour.bulkCreate(flavourlist),
                  Product_Shape.bulkCreate(shapelist),
                ]).then(result1 => {
                  res.send({
                    success: true,
                    message: 'Product created successfully',
                  });
                });
              } else {
                res.send({
                  success: true,
                  message: 'Product created successfully',
                });
              }
            })
            .catch(err => {
              console.log(err);
              res.status(500).send({
                success: false,
                message: err,
              });
            });
        } else {
          res.status(500).send({
            success: false,
            message: 'Product name already exists',
          });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          success: false,
          message: err,
        });
      });
  },
  updateProduct: (req, res) => {
    if (req.body.imagebase) {
      base64Img.img(
        req.body.imagebase,
        'uploads/',
        req.body.name.toLowerCase().split(' ').join(''),
        function (err, filepath) {
          console.log(filepath);
          req.body.image = filepath;
          Product.update(req.body, {
            where: {
              id: req.body.id,
            },
          }).then(result => {
            console.log(result.id);
            const flavourlist = [];
            const shapelist = [];

            if (req.body.flavourid.length > 0) {
              req.body.flavourid.forEach((specification, i) => {
                flavourlist.push({
                  product_id: req.body.id,
                  flavour_id: specification,
                });
              });
              req.body.shapeid.forEach((shape, i) => {
                shapelist.push({ product_id: req.body.id, shape_id: shape });
              });
            }

            Promise.all([
              Product_Flavour.destroy({
                where: {
                  product_id: req.body.id,
                },
              }),
              Product_Shape.destroy({ where: { product_id: req.body.id } }),
            ]).then(result => {
              Promise.all([
                Product_Shape.bulkCreate(shapelist),
                Product_Flavour.bulkCreate(flavourlist),
              ])
                .then(result1 => {
                  res.send({
                    success: true,
                    message: 'Product edited successfully',
                  });
                })
                .catch(err => {
                  console.log(err);
                  res.status(500).send({
                    success: false,
                    message: 'Error while updating product',
                  });
                });
            });
          });
        },
      );
    } else {
      req.body.image = null;
      Product.update(req.body, {
        where: {
          id: req.body.id,
        },
      }).then(result => {
        const flavourlist = [];
        const shapelist = [];

        if (req.body.flavourid.length > 0) {
          req.body.flavourid.forEach((specification, i) => {
            flavourlist.push({
              product_id: req.body.id,
              flavour_id: specification,
            });
          });
          req.body.shapeid.forEach((shape, i) => {
            shapelist.push({ product_id: req.body.id, shape_id: shape });
          });
        }
        Promise.all([
          Product_Flavour.destroy({
            where: {
              product_id: req.body.id,
            },
          }),
          Product_Shape.destroy({ where: { product_id: req.body.id } }),
        ]).then(result => {
          Promise.all([
            Product_Shape.bulkCreate(shapelist),
            Product_Flavour.bulkCreate(flavourlist),
          ])
            .then(result1 => {
              res.send({
                success: true,
                message: 'Product edited successfully',
              });
            })
            .catch(err => {
              console.log(err);
              res.status(500).send({
                success: false,
                message: 'Error while updating product',
              });
            });
        });
      });
    }
  },
  deleteProduct: (req, res) => {
    Product.destroy({
      where: {
        id: req.body.id,
      },
    })
      .then(deletedRows => {
        if (deletedRows === 1) {
          res.send({
            success: true,
            message: 'Product deleted successfully',
          });
        } else {
          res.status(500).send({
            success: false,
            message: 'Product doesnot exist',
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          success: false,
          message: 'Error in deleting rows',
        });
      });
  },
};
