const app = require('express')();
const bcrypt = require('bcrypt');
const User = require('../../models/User/user');
const jwt = require('jsonwebtoken');
const validateUser = username => {
  return new Promise((resolve, reject) => {
    console.log(username);
    User.findAll({
      where: {
        username: username,
      },
    })
      .then(results => {
        if (results.length === 0) {
          resolve('1');
        } else if (results.length > 0) {
          reject(new Error('Username already exists'));
        }
      })
      .catch(err => {
        console.log(err);
        reject(err);
      });
  });
};

const compareUsernameandPassword = req => {
  return new Promise((resolve, reject) => {
    User.findAll({
      where: {
        username: req.body.username,
      },
    })
      .then(results => {
        if (results.length === 1) {
          bcrypt.compare(
            req.body.password,
            results[0].password,
            async (err, result) => {
              if (result) {
                const user = await User.findOne({
                  where: {
                    username: req.body.username,
                  },
                });
                user.logged_in = true;
                user.save();
                const token = jwt.sign(
                  {
                    user_id: user.getDataValue('user_id'),
                    user_type: user.getDataValue('user_type'),
                    username: user.getDataValue('username'),
                  },
                  'shailesh',
                  {
                    expiresIn: '241h',
                  },
                );
                resolve({ token: token });
              } else {
                resolve({ error: 'Password didnot match' });
              }
            },
          );
        } else if (results.length === 0) {
          resolve({ error: 'Username not found' });
        }
      })
      .catch(err => {
        console.log(err);
        reject(new Error('Error in creating user'));
      });
  });
};

const compareAdminUsernameandPassword = req => {
  return new Promise((resolve, reject) => {
    User.findAll({
      where: {
        username: req.body.username,
        user_type: 'admin',
      },
    })
      .then(results => {
        if (results.length === 1) {
          bcrypt.compare(
            req.body.password,
            results[0].password,
            async (err, result) => {
              if (result) {
                const user = await User.findOne({
                  where: {
                    username: req.body.username,
                  },
                });
                user.logged_in = true;
                user.save();
                const token = jwt.sign(
                  {
                    user_id: user.getDataValue('user_id'),
                    user_type: user.getDataValue('user_type'),
                    username: user.getDataValue('username'),
                  },
                  'shailesh',
                  {
                    expiresIn: '241h',
                  },
                );
                resolve({ token: token });
              } else {
                resolve({ error: 'Password didnot match' });
              }
            },
          );
        } else if (results.length === 0) {
          resolve({ error: 'Username not found' });
        }
      })
      .catch(err => {
        console.log(err);
        reject(new Error(err.message));
      });
  });
};

const hashPassword = password => {
  return new Promise((resolve, reject) => {
    console.log(password);
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        reject(new Error('Password hashing failed'));
      }
      resolve(hash);
    });
  });
};

module.exports = {
  displayUser: (req, res) => {
    User.findAll({
      attributes: {
        exclude: ['password'],
      },
    })
      .then(result => {
        res.send({
          success: true,
          userlist: result,
        });
      })
      .catch(err => {
        res.status(500).send({
          success: false,
          message: 'Error in connecting to User table',
        });
      });
  },
  displayUserById: (req, res) => {
    User.findAll({
      where: {
        user_id: req.params.id,
      },
      attributes: {
        exclude: ['password'],
      },
    })
      .then(result => {
        res.send({
          success: true,
          userlist: result,
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).send({
          success: false,
          message: 'Error in connecting to User table',
        });
      });
  },
  createUser: (req, res) => {
    console.log(req.body);

    Promise.all([
      validateUser(req.body.username),
      hashPassword(req.body.password),
    ])
      .then(result => {
        if (result[0] === '0') {
          res.status(500).json({
            success: false,
            message: 'Username already exists',
          });
        } else {
          req.body.password = result[1];
          User.create(req.body)
            .then(result => {
              // console.log(result);
              res.send({
                success: true,
                message: 'User created successfully',
              });
            })
            .catch(err => {
              console.log(err);
              res.status(500).send({
                success: false,
                message: err.message,
              });
            });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).send({
          success: false,
          message: err.message,
        });
      });
  },
  updateUser: async (req, res) => {
    const user_details = await User.findOne({
      where: {
        user_id: req.body.user_id,
        username: req.body.username,
      },
    });
    console.log(user_details);
    if (user_details) {
      User.update(
        {
          ...req.body,
          username: user_details.getDataValue('username'),
          password: user_details.getDataValue('password'),
        },
        { where: { user_id: req.body.user_id } },
      )
        .then(result => {
          res.send({
            success: true,
            message: 'User details updated successfully',
          });
        })
        .catch(err => {
          res.status(500).send({
            success: false,
            message: 'Unable to edit details',
          });
        });
    } else {
      res.status(500).send({
        success: false,
        message: 'User not found',
      });
    }
  },
  deleteUser: (req, res) => {
    User.destroy({
      where: {
        user_id: req.body.user_id,
      },
    })
      .then(results => {
        if (results === 1) {
          res.json({ success: true, message: 'User deleted successfully' });
        } else {
          res.status(500).json({ success: false, message: 'User not found' });
        }
      })
      .catch(err => {
        res.status(500).json({ success: false, message: err.message });
      });
  },
  loginUser: (req, res) => {
    console.log(req.body);
    compareUsernameandPassword(req)
      .then(result => {
        if (result.error) {
          res.status(500).send({ success: false, message: result.error });
        } else {
          res.send({ success: true, token: result.token });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).send({ success: false, message: err.message });
      });
  },
  loginAdmin: (req, res) => {
    console.log(req.body);
    compareAdminUsernameandPassword(req)
      .then(result => {
        if (result.error) {
          res.status(500).send({ success: false, message: result.error });
        } else {
          res.send({ success: true, token: result.token });
        }
      })
      .catch(err => {
        res.status(500).send({ success: false, message: err.message });
      });
  },
  changePassword: async (req, res) => {
    Promise.all([
      compareUsernameandPassword(req),
      hashPassword(req.body.new_password),
    ])
      .then(async result => {
        const user_details = await User.findOne({
          where: {
            username: req.body.username,
          },
        });
        if (result[0].error) {
          res
            .status(500)
            .send({ success: false, message: 'Password didnot match' });
        } else {
          user_details.password = result[1];
          user_details.save();
          res.send({ success: true, message: 'Password changed successfully' });
        }
      })
      .catch(err => {
        res.status(500).send({ success: false, message: err.message });
      });
  },
};
