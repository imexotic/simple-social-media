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
   const query = 'SELECT posts.*, users.username FROM posts JOIN users ON posts.user_id = users.id WHERE posts.id = ?';
   const query_values = [req.params.id];
   
   db.query(query, query_values, (err, results) => {
      if (err) next(err);

      return res.send(results);
   });
}

const createPost = (req, res, next) => {
   const query = 'INSERT INTO posts (user_id, title, description, createdAt) VALUES (?, ?, ?, ?)';
   const query_values = [req.body.user_id, req.body.title, req.body.description, req.body.createdAt];

   db.query(query, query_values, (err, results) => {
      if (err) next(err);

      return res.send('post created')
   });
}

const updatePost = (req, res, next) => {
   const id = req.params.id;
   const data = req.body;

   const query = 'UPDATE posts SET ? WHERE id = ?';
   const query_values = [data, id]

   db.query(query, query_values, (err, results) => {
      if (err) next(err);

      return res.send('post updated')
   });
}

module.exports = {
   getAllPosts,
   getPostById,
   createPost,
   updatePost
}