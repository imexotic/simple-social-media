const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
   const token = req.headers['x-access-token'];
   
   if (!token) next('we need a token');

   jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
      if (err) res.json({ auth: false, msg: err});

      req.userId = decoded.id;
      next();
   });
}

module.exports = verifyJWT;