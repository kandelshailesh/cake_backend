
const app = require('express')();
const bcrypt = require('bcrypt');
const Category = require('../../models/Inventory/product_category');

const checkCategory = (name) => {
    return new Promise((resolve, reject) => {
        Category.findAll({
            where: {
                name: name
            }
        }).then((results) => {
            console.log(results);
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
    displayCategory: (req, res) => {
        Category.findAll({ include: { all: true } }).then((result) => {
            res.send({
                success: true,
                categorylist: result
            })

        }).catch((err) => {
            res.status(500).send({
                success: false,
                message: 'Error in connecting to table'

            })
        })
    },
    createCategory: (req, res) => {
        console.log(req.body);
        checkCategory(req.body.name).then((result) => {
            // console.log(result);
            if (result === 1) {
                Category.create(req.body).then((result) => {
                    res.send({
                        success: true,
                        message: 'Category created successfully'
                    })
                }).catch((err) => {
                    console.log(err);
                    res.status(500).send({
                        success: false,
                        message: 'Error while creating Category'
                    })
                })

            }
            else {
                res.status(500).send({
                    success: false,
                    message: 'Category name already exists'
                })
            }
        }).catch((err) => {
            console.log(err);
            res.status(500).json({
                success: false,
                message: err
            })
        })
    },
    updateCategory: (req, res) => {
        Category.update(req.body, {
            where: {
                id: req.body.id
            }
        }).then((result) => {
            res.send({
                success: true,
                message: 'Category edited successfully'
            })
        })
    },
    deleteCategory: (req, res) => {
        console.log(req.body);
        Category.destroy({
            where: {
                id: req.body.id
            }
        }).then((deletedRows) => {
            if (deletedRows === 1) {
                res.send({
                    success: true,
                    message: 'Category deleted successfully'
                });
            }
            else {
                res.status(500).send({
                    success: false,
                    message: 'Category doesnot exist'
                });

            }
        }).catch((err) => {
            res.status(500).send({
                success: false,
                message: err.message
            })
        })
    }
}