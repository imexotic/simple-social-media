const express = require('express');
const postController = require('../controllers/post.controller');
const verifyJWT = require('../auth/verifyJWT');

const postRouter = express.Router();

postRouter.get('/', verifyJWT, postController.getAllPosts);
postRouter.get('/:id', postController.getPostById);
postRouter.get('/post', postController.getSpecificPost);
postRouter.post('/', postController.createPost);
postRouter.put('/:id', postController.updatePost);
postRouter.delete('/:id', postController.removePost);

module.exports = postRouter;