const { register, login } = require('../services/auth.service');

class AuthController {
    async register(req, res, next) {
        try {
            const json = await register(req);
            return res.status(201).json(json);
        } catch (error) {
            next(error);
        }
    }

    async login(req, res, next) {
        try {
            const json = await login(req);
            return res.status(200).json(json);
        } catch (error) {
            // console.log(error);
            next(error);
        }
    }
}

module.exports = new AuthController();
