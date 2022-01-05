const db = require('../config/mysql.js');


const getAllUsers = (req, res) => {
   res.send('hello')
}

module.exports = {
   getAllUsers
}