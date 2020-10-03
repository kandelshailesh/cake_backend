
const app = require('express')();
const bcrypt = require('bcrypt');
const Subcategory = require('../../models/Inventory/product_subcategory');
const Category = require('../../models/Inventory/product_category');
const Product = require('../../models/Inventory/inventory_product');
const sequelize = require('../../db_config/db');
const db= sequelize.models;
const debug = require('debug')('shailesh');

const checkSubcategory = (name) => {
    return new Promise((resolve, reject) => {
        Subcategory.findAll({
            where: {
                name: name
            }
        }).then((results) => {
            if (results.length === 0) {
                resolve(1);
            }
            else {
                resolve(0);
            }
        }).catch((err) => {
            reject(new Error('Error in creating role'));
        })
    })
}

module.exports = {
    displaySubcategory: (req, res) => {
        Subcategory.findAll({ include:[{model:Category},{model:Product,include:[{model:db.productUnit},{model:db.inventoryProductShape},{model:db.inventoryProductFlavour}]}]}).then((result) => {
           debug(result);
            res.send({
                success: true,
                subcategorylist: result
            })

        }).catch((err) => {
            console.log(err);
            res.status(500).send({
                success: false,
                message: 'Error in connecting to table'

            })
        })
    },
    createSubcategory: (req, res) => {
        console.log(req.body);
        checkSubcategory(req.body.name).then((result) => {
            // console.log(result);
            if (result === 1) {
                Subcategory.create(req.body).then((result) => {
                    res.send({
                        success: true,
                        message: 'Subcategory created successfully'
                    })
                }).catch((err) => {
                    console.log(err);
                    res.send({
                        success: false,
                        message: 'Error while creating Subcategory'
                    })
                })

            }
            else {
                res.send({
                    success: false,
                    message: 'Subcategory name already exists'
                })
            }
        }).catch((err) => {
            console.log(err);
            res.json({
                success: false,
                message: err
            })
        })
    },
    updateSubcategory: (req, res) => {
        Subcategory.update(req.body, {
            where: {
                id: req.body.id
            }
        }).then((result) => {
            res.send({
                success: true,
                message: 'Subcategory edited successfully'
            })
        })
    },
    deleteSubcategory: (req, res) => {
        Subcategory.destroy({
            where: {
                id: req.body.id
            }
        }).then((deletedRows) => {
            if (deletedRows === 1) {
                res.send({
                    success: true,
                    message: 'Subcategory deleted successfully'
                });
            }
            else {
                res.send({
                    success: false,
                    message: 'Subcategory doesnot exist'
                });

            }
        }).catch((err) => {
            res.send({
                success: false,
                message: 'Error in deleting rows'
            })
        })
    }
}
