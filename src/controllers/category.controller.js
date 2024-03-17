const { create, getAll, get } = require('../services/category.sevice');

class CategoryController {
    async create(req, res, next) {
        try {
            const json = await create(req);
            return res.status(json.status).json(json);
        } catch (error) {
            next(error);
        }
    }

    async getAll(req, res, next) {
        try {
            const json = await getAll(req);
            return res.status(json.status).json(json);
        } catch (error) {
            next(error);
        }
    }

    async get(req, res, next) {
        try {
            const json = await get(req);
            return res.status(json.status).json(json);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new CategoryController();
