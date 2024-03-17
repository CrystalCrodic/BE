const { addCart, getUser, deleteCart } = require('../services/user.service');

class UserController {
    async addCart(req, res, next) {
        try {
            const json = await addCart(req);
            return res.status(json.status).json(json);
        } catch (error) {
            next(error);
        }
    }

    async getUser(req, res, next) {
        try {
            const json = await getUser(req);
            return res.status(json.status).json(json);
        } catch (error) {
            next(error);
        }
    }

    async deleteCart(req, res, next) {
        try {
            const json = await deleteCart(req);
            return res.status(json.status).json(json);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new UserController();
