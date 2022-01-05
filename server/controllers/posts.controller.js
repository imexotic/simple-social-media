const db = require('../config/mysql.js');

const getAllPosts = (req, res, next) => {
   //const query = 'SELECT * FROM posts WHERE user_id = ? ORDER BY createdAt DESC';

   db.query('SELECT * FROM posts', (err, results) => {
      if (err) next(err);

      return res.send(results);
   });
}

/* const getAllPosts = (req, res, next) => {
   const query = 'SELECT posts.*, users.username FROM posts JOIN users ON posts.user_id = users.id ORDER BY posts.createdAt DESC;';

   db.query(query, (err, results) => {
      if (err) next(err);

      console.log(results);

      return res.send(results);
   })
} */

const getPostById = (req, res, next) => {
   db.query('SELECT posts.*, users.username FROM posts JOIN users ON posts.user_id = users.id WHERE posts.id = ?;', [req.params.id], (err, results) => {
      if (err) next(err);

      return res.send(results);
   });
}

const createPost = (req, res, next) => {
   const query = 'INSERT INTO posts (user_id, title, description, createdAt) VALUES (?, ?, ?, ?)';
   const data = [req.body.user_id, req.body.title, req.body.description, req.body.createdAt];

   db.query(query, data, (err, results) => {
      if (err) next(err);

      return res.send('post created')
   });
}

module.exports = {
   getAllPosts,
   getPostById,
   createPost
}