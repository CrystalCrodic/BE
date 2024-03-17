const express = require('express');
const router = express.Router();

const parser = require('../configs/cloudinary.config');
const productController = require('../controllers/product.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.post(
    '/',
    authMiddleware.auth,
    authMiddleware.checkRoleAdmin,
    parser.fields([
        {
            name: 'capture',
            maxCount: 1,
        },
        { name: 'images', maxCount: 5 },
    ]),
    productController.create
);

router.get('/', productController.getAll);
router.get('/:id', productController.getById);

module.exports = router;
