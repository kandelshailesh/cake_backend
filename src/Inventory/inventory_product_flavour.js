
const app = require('express')();
const bcrypt = require('bcrypt');
const InvProduct_Flavour = require('../../models/Inventory/inventory_product_flavour');

const checkInvProduct_Flavour = (name) => {
    return new Promise((resolve, reject) => {
        InvProduct_Flavour.findAll({
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
    displayInvProduct_Flavour: (req, res) => {
        InvProduct_Flavour.findAll({}).then((result) => {

            res.send({
                success: true,
                ipslist: result
            })

        }).catch((err) => {
            res.status(500).send({
                success: false,
                message: 'Error in connecting to table'

            })
        })
    },
    createInvProduct_Flavour: (req, res) => {
        console.log(req.body);
        checkInvProduct_Flavour(req.body.name).then((result) => {
            // console.log(result);
            if (result === 1) {
                InvProduct_Flavour.create(req.body).then((result) => {
                    res.send({
                        success: true,
                        message: 'InvProduct_Flavour created successfully'
                    })
                }).catch((err) => {
                    console.log(err);
                    res.status(500).send({
                        success: false,
                        message: 'Error while creating InvProduct_Flavour'
                    })
                })

            }
            else {
                res.status(500).send({
                    success: false,
                    message: 'InvProduct_Flavour name already exists'
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
    updateInvProduct_Flavour: (req, res) => {
        InvProduct_Flavour.update(req.body, {
            where: {
                id: req.body.id
            }
        }).then((result) => {
            res.send({
                success: true,
                message: 'InvProduct_Flavour edited successfully'
            })
        })
    },
    deleteInvProduct_Flavour: (req, res) => {
        InvProduct_Flavour.destroy({
            where: {
                id: req.body.id
            }
        }).then((deletedRows) => {
            if (deletedRows === 1) {
                res.send({
                    success: true,
                    message: 'InvProduct_Flavour deleted successfully'
                });
            }
            else {
                res.status(500).send({
                    success: false,
                    message: 'InvProduct_Flavour doesnot exist'
                });

            }
        }).catch((err) => {
            res.status(500).send({
                success: false,
                message: 'Error in deleting rows'
            })
        })
    }
}