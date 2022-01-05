const express = require('express');
const authController = require('../controllers/auth.controller.js')
const verifyJWT = require('../auth/vertifyjwt');

const authRouter = express.Router();

authRouter.get('/isAuth', verifyJWT, authController.isAuth)
authRouter.post('/login', authController.login);
authRouter.post('/register', authController.register);

module.exports = authRouter;