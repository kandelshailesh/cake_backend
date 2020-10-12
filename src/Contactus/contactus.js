const app = require('express')();
const bcrypt = require('bcrypt');
const Contact = require('../../models/Contact/contactus');

module.exports = {
  displayContact: (req, res) => {
    Contact.findAll({
      order: [['id', 'DESC']],
    })
      .then(result => {
        console.log(result);
        res.send({
          success: true,
          contactlist: result,
        });
      })
      .catch(err => {
        res.send({
          success: false,
          message: 'Error in connecting to table',
        });
      });
  },
  createContact: (req, res) => {
    Contact.create(req.body)
      .then(result => {
        res.send({
          success: true,
          message: 'Contact created successfully',
        });
      })
      .catch(err => {
        console.log(err);
        res.send({
          success: false,
          message: 'Error while creating Contact',
        });
      });
  },
  updateContact: (req, res) => {
    Contact.update(req.body, {
      where: {
        id: req.body.id,
      },
    }).then(result => {
      res.send({
        success: true,
        message: 'Contact edited successfully',
      });
    });
  },
  deleteContact: (req, res) => {
    Contact.destroy({
      where: {
        id: req.body.id,
      },
    })
      .then(deletedRows => {
        if (deletedRows === 1) {
          res.send({
            success: true,
            message: 'Contact deleted successfully',
          });
        } else {
          res.send({
            success: false,
            message: 'Contact doesnot exist',
          });
        }
      })
      .catch(err => {
        res.send({
          success: false,
          message: 'Error in deleting rows',
        });
      });
  },
};
