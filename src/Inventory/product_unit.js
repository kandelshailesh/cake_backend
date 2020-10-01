
const app = require('express')();
const bcrypt = require('bcrypt');
const Unit = require('../../models/Inventory/product_unit');

const checkUnit = (name) => {
    return new Promise((resolve, reject) => {
        Unit.findAll({
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
    displayUnit: (req, res) => {
        Unit.findAll({}).then((result) => {
            console.log(result);
            res.send({
                success: true,
                unitlist: result
            })
        }).catch((err) => {
            res.send({
                success: false,
                message: 'Error in connecting to table'

            })
        })
    },
    createUnit: (req, res) => {
        console.log(req.body);
        checkUnit(req.body.name).then((result) => {
            // console.log(result);
            if (result === 1) {
                Unit.create(req.body).then((result) => {
                    res.send({
                        success: true,
                        message: 'Unit created successfully'
                    })
                }).catch((err) => {
                    console.log(err);
                    res.send({
                        success: false,
                        message: 'Error while creating Unit'
                    })
                })

            }
            else {
                res.send({
                    success: false,
                    message: 'Unit name already exists'
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
    updateUnit: (req, res) => {
        Unit.update(req.body, {
            where: {
                id: req.body.id
            }
        }).then((result) => {
            res.send({
                success: true,
                message: 'Unit edited successfully'
            })
        })
    },
    deleteUnit: (req, res) => {
        Unit.destroy({
            where: {
                id: req.body.id
            }
        }).then((deletedRows) => {
            if (deletedRows === 1) {
                res.send({
                    success: true,
                    message: 'Unit deleted successfully'
                });
            }
            else {
                res.send({
                    success: false,
                    message: 'Unit doesnot exist'
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