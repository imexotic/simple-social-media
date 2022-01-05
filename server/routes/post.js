const express = require('express');
const postController = require('../controllers/posts.controller');
const verifyJWT = require('../auth/vertifyjwt');

const postRouter = express.Router();

postRouter.get('/', verifyJWT, postController.getAllPosts);
postRouter.get('/:id', postController.getPostById);
postRouter.post('/', postController.createPost);

module.exports = postRouter;