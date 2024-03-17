const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');
const userController = require('../controllers/user.controller');

router.post('/cart', authMiddleware.auth, userController.addCart);
router.put('/cart/:id', authMiddleware.auth, userController.deleteCart);
router.get('/:id', authMiddleware.auth, userController.getUser);

module.exports = router;
