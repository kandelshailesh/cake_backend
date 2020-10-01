
const app = require('express')();
const bcrypt = require('bcrypt');
const Flavour = require('../../models/Inventory/product_flavour');

const checkSpecification = (name) => {
    return new Promise((resolve, reject) => {
        Flavour.findAll({
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
    displaySpecification: (req, res) => {
        Flavour.findAll({}).then((result) => {
            res.send({
                success: true,
                flavourlist: result
            })
        }).catch((err) => {
            res.status(500).send({
                success: false,
                message: 'Error in connecting to table'

            })
        })
    },
    createSpecification: (req, res) => {
        checkSpecification(req.body.name).then((result) => {
            // console.log(result);
            if (result === 1) {
                Flavour.create(req.body).then((result) => {
                    res.send({
                        success: true,
                        message: 'Flavour created successfully'
                    })
                }).catch((err) => {
                    console.log(err);
                    res.status(500).send({
                        success: false,
                        message: 'Error while creating Flavour'
                    })
                })

            }
            else {
                res.status(500).send({
                    success: false,
                    message: 'Flavour name already exists'
                })
            }
        }).catch((err) => {
            console.log(err);
            res.status(500).send({
                success: false,
                message: err
            })
        })
    },
    updateSpecification: (req, res) => {
        Flavour.update(req.body, {
            where: {
                id: req.body.id
            }
        }).then((result) => {
            res.send({
                success: true,
                message: 'Flavour edited successfully'
            })
        })
    },
    deleteSpecification: (req, res) => {
        Flavour.destroy({
            where: {
                id: req.body.id
            }
        }).then((deletedRows) => {
            if (deletedRows === 1) {
                res.send({
                    success: true,
                    message: 'Flavour deleted successfully'
                });
            }
            else {
                res.status(500).send({
                    success: false,
                    message: 'Flavour doesnot exist'
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