const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
dotenv.config();




// Middlewares
// Middleware for logs
app.use(morgan('dev'));
// Middlewares for body-parser
app.use(express.json())
app.use(express.urlencoded({ extended: false } ));
// Middleware for cross-platform connection
app.use(cors());





app.get('/', (req, res, next) => {
    res.send(req.body.name);
});


module.exports = app;