const express = require('express');
const verifyJWT = require('../auth/verifyJWT');
const authController = require('../controllers/auth.controller.js')

const authRouter = express.Router();


authRouter.get('/isAuth', verifyJWT, authController.isAuth)
authRouter.post('/login', authController.login);
authRouter.post('/register', authController.register);

module.exports = authRouter;