const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');
const billController = require('../controllers/bill.controller');

router.post('/', authMiddleware.auth, billController.create);

module.exports = router;
