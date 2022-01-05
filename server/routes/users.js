const express = require('express');
const userControllers = require('../controllers/users.controller');

const userRouter = express.Router();

userRouter.get('/', userControllers.getAllUsers);

module.exports = userRouter;