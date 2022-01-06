const mysql2 = require('mysql2');

/* const db = mysql2.createPool({
   connectionLimit: 100,
   host: process.env.DB_HOST,
   user: process.env.DB_USER,
   password: process.env.DB_PASS,
   database: process.env.DB_SCHEMA
}); */


const db = mysql2.createConnection({
   host: process.env.DB_HOST,
   user: process.env.DB_USER,
   password: process.env.DB_PASS,
   database: process.env.DB_SCHEMA
});

db.connect(err => {
   if (err) throw err;

   console.log('mySQL connected!');
});

module.exports = db;