
const app = require('express')();
const bcrypt = require('bcrypt');
const Shape = require('../../models/Inventory/product_shape');

const checkSpecification = (name) => {
    return new Promise((resolve, reject) => {
        Shape.findAll({
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
        Shape.findAll({}).then((result) => {
            console.log(result);
            res.send({
                success: true,
                shapelist: result
            })
        }).catch((err) => {
            res.status(500).send({
                success: false,
                message: 'Error in connecting to table'
            })
        })
    },
    createSpecification: (req, res) => {
        console.log(req.body);
        checkSpecification(req.body.name).then((result) => {
            // console.log(result);
            if (result === 1) {
                Shape.create(req.body).then((result) => {
                    res.send({
                        success: true,
                        message: 'Shape created successfully'
                    })
                }).catch((err) => {
                    console.log(err);
                    res.status(500).send({
                        success: false,
                        message: 'Error while creating Shape'
                    })
                })

            }
            else {
                res.status(500).send({
                    success: false,
                    message: 'Shape name already exists'
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
        Shape.update(req.body, {
            where: {
                id: req.body.id
            }
        }).then((result) => {
            res.send({
                success: true,
                message: 'Shape edited successfully'
            })
        })
    },
    deleteSpecification: (req, res) => {
        Shape.destroy({
            where: {
                id: req.body.id
            }
        }).then((deletedRows) => {
            if (deletedRows === 1) {
                res.send({
                    success: true,
                    message: 'Shape deleted successfully'
                });
            }
            else {
                res.status(500).send({
                    success: false,
                    message: 'Shape doesnot exist'
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