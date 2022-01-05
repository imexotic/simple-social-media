const db = require('../config/mysql.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const isAuth = (req, res, next) => {
   return res.json({ auth: true, msg: 'You are authenicated!'});
}

const register = (req, res, next) => {
   const { username, password } = req.body;

   bcrypt.hash(password, 10).then(hash => {
      const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
      const data = [username, hash];

      db.query(query, data, (err, results) => {
         return res.json({
            auth: true,
            msg: `Affected rows: 1`
         });
      });
   });
}

const login = (req, res, next) => {
   const { username, password } = req.body;

   const query = 'SELECT * FROM users WHERE username = ?';
   const data = [username];

   db.query(query, data, (err, results) => {
      if (err) next(err);

      if (results.length) {
         const { id, password: dbPassword } = results[0];

         bcrypt.compare(password, dbPassword).then(match => {
            if (!match) return res.json({auth: false, msg: 'Wrong username and password combination!'});


            // Creating token based on id
            const token = jwt.sign({id}, process.env.JWT_SECRET_KEY, {
               expiresIn: 1000
            });

            return res.send({
               auth: true,
               msg: 'Successfuly logged in!',
               token: token,
               user: { 
                  id,
                  username 
               }
            });
         });
      } else {
         return res.json({
            auth: false,
            msg: 'User does not exist!'
         });
      }
   });
}

module.exports = {
   register,
   login,
   isAuth
}