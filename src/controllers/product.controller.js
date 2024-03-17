const { create, getById, getAllProduct } = require('../services/product.service');

class ProductController {
    async create(req, res, next) {
        try {
            const json = await create(req);
            return res.status(json.status).json(json);
        } catch (error) {
            next(error);
        }
    }

    async getById(req, res, next) {
        try {
            const json = await getById(req);
            return res.status(json.status).json(json);
        } catch (error) {
            next(error);
        }
    }

    async getAll(req, res, next) {
        try {
            const json = await getAllProduct(req);
            return res.status(json.status).json(json);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new ProductController();
