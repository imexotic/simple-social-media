const db = require('../config/mysql.js');

const getAllPosts = (req, res, next) => {
   //const query = 'SELECT * FROM posts WHERE user_id = ? ORDER BY createdAt DESC';

   db.query('SELECT * FROM posts', (err, results) => {
      if (err) next(err);

      return res.send(results);
   });
}


const getPostById = (req, res, next) => {
   const id = req.params.id;

   const query = 'SELECT posts.*, users.username FROM posts JOIN users ON posts.user_id = users.id WHERE posts.id = ?';
   const query_values = [id];

   db.query(query, query_values, (err, results) => {
      if (err) next(err);

      return res.send(results);
   });
}

const getSpecificPost = (req, res, next) => {
   const title = req.query;

   const query = "SELECT * FROM posts WHERE title LIKE '%?%'";
   const query_values = [title];


   res.send('hello')
}


const createPost = (req, res, next) => {
   const query = 'INSERT INTO posts (user_id, title, description, createdAt) VALUES (?, ?, ?, ?)';
   const query_values = [req.body.user_id, req.body.title, req.body.description, req.body.createdAt];

   db.query(query, query_values, (err, results) => {
      if (err) next(err);

      return res.send('Post created')
   });
}


const updatePost = (req, res, next) => {
   const id = req.params.id;
   const data = req.body;

   console.log(id, data);

   const query = 'UPDATE posts SET ? WHERE id = ?';
   const query_values = [data, id]

   db.query(query, query_values, (err, results) => {
      if (err) next(err);

      return res.send('Post updated');
   });
}


const removePost = (req, res, next) => {
   const id = req.params.id;
   
   const query = 'DELETE FROM posts WHERE id = ?';
   const query_values = [id];

   db.query(query, query_values, (err, results) => { 
      if (err) next(err);

      return res.send('Post deleted');
   });
}


module.exports = {
   getAllPosts,
   getPostById,
   getSpecificPost,
   createPost,
   updatePost,
   removePost
}