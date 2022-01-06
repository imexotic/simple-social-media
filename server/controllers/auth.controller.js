const db = require('../config/mysql.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const isAuth = (req, res, next) => {
   return res.json({ auth: true, msg: 'You are authenicated!'});
}

const register = (req, res, next) => {
   const { username, password, email } = req.body;

   bcrypt.hash(password, 10).then(hashedPassword => {
      const query = 'INSERT INTO users (username, password, email) VALUES (?, ?, ?)';
      const data = [username, hashedPassword, email];

      db.query(query, data, (err, results) => {
         return res.json({
            auth: true,
            msg: `Successfully registered!`
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
         const { id, password: dbPassword, email } = results[0];

         bcrypt.compare(password, dbPassword).then(match => {
            if (!match) return res.json({
               auth: false, msg: 'Wrong username and password combination!'
            });


            // Creating token based on id
            const token = jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
               expiresIn: 1000
            });

            return res.send({
               auth: true,
               msg: 'Successfuly logged in!',
               token: token,
               user: { id, username, email }
            });
         });
      } else {
         return res.json({
            auth: false, msg: 'User does not exist!'
         });
      }
   });
}


module.exports = {
   isAuth,
   register,
   login
}