const express = require('express');
const authMiddleware = require('../middleware/auth.middleware');
const categoryController = require('../controllers/category.controller');
const router = express.Router();

router.post('/', authMiddleware.auth, authMiddleware.checkRoleAdmin, categoryController.create);
router.get('/', categoryController.getAll);
router.get('/:id', categoryController.get);

module.exports = router;
