var jwt = require('jsonwebtoken');
var secret = require('../config').secret;

function getTokenFromHeader(req){
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'token' ||
        req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      return req.headers.authorization.split(' ')[1];
    }
    return null;
  }
// function getTokenFromHeader(req){
//     if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'token' ||
//         req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
//       return req.headers.authorization.split(' ')[1];
//     }
  
//     return null;
//   }
  
//   var auth = {
//     required: jwt({
//       secret: secret,
//       userProperty: 'payload',
//       getToken: getTokenFromHeader
//     }),
//     optional: jwt({
//       secret: secret,
//       userProperty: 'payload',
//       credentialsRequired: false,
//       getToken: getTokenFromHeader
//     })
//   };

var auth = (req, res, next) => {
  try {
      const token = req.query.token;
      console.log('bodyknkk is: ', req.query);
      var decoded = jwt.verify(req.query.token, secret);
      console.log("decode",decoded)
      req.userData = decoded;
      // await console.log('DECODEDS is: ', jwt.verify(req.query.token, secret));
      next()
  } catch (error) {
    console.log('érrors', error)
      return res.status(401).json({
          message: 'Auth Failed'
      });
  }
}
  
  module.exports = auth;
  