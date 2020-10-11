const jwt = require('jsonwebtoken');

var verify_token = (req, res, next) => {
  next();
  //   try {
  //     const bearerHeader = req.headers['authorization'];

  //     if (typeof bearerHeader !== undefined) {
  //       const bearer = bearerHeader.split(' ');
  //       const bearertoken = bearer[1];
  //       req.token = bearertoken;
  //       jwt.verify(req.token, 'shailesh', (err, decoded) => {
  //         if (err) {
  //           res
  //             .status(500)
  //             .json({ success: false, message: 'Token Mismatched or  Expired' });
  //         } else {
  //           req.userID = decoded.userID;
  //           req.user_type = decoded.user_type;
  //           req.credentialID = decoded.credential_id;
  //           next();
  //         }
  //       });
  //     }
  //   } catch {
  //     res.status(401).json({ success: false, message: 'Invalid request' });
  //   }
};

module.exports = verify_token;
