require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const errorhandler = require('errorhandler');

const userRouter = require('./routes/users.js');
const authRouter = require('./routes/auth.js');
const postRouter = require('./routes/post.js');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cors());

// Routes
app.use('/', authRouter);
app.use('/users', userRouter);
app.use('/posts', postRouter);


app.use(errorhandler());

// Initialising the server
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
   console.log(`Server listening at port ${PORT}`);
});