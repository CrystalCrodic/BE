// Import
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const createError = require('http-errors');
require('dotenv').config();

// Import file
const Connection = require('./configs/DBContext');
const { errorHandler } = require('./middleware/errorHandler');

// Config app
const app = express();
const PORT = process.env.PORT || 3000;

// Config Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('common'));
app.use(
    cors({
        origin: ['http://localhost:3000'],
        credentials: true,
    })
);
app.use(express.static('public'));

// Connection MongoDB
Connection();

// Routes
app.use('/api/v1/auth', require('./routes/auth.route'));
app.use('/api/v1/user', require('./routes/user.route'));
app.use('/api/v1/category', require('./routes/category.route'));
app.use('/api/v1/product', require('./routes/product.route'));
app.use('/api/v1/bill', require('./routes/bill.route'));

app.use('*', (req, res, next) => {
    const error = createError(404, 'API not found !!!');
    next(error);
});

app.use(errorHandler);

// App Start
app.listen(PORT, () => {
    console.log(`Server is running in http://localhost:${PORT}`);
});
