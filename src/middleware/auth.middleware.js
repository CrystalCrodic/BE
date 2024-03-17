const { verifyAccessToken, verifyRefreshToken } = require('../utils/auth');

class AuthMiddleware {
    async auth(req, res, next) {
        try {
            const authorization = req.headers['authorization'];
            if (!authorization) return res.status(401).json({ status: 401, message: 'Required Authentication' });
            const token = authorization.split(' ')[1];
            if (!token) return res.status(401).json({ status: 401, message: 'Token not exist' });
            const decode = verifyAccessToken(token);
            if (!decode.status) return res.status(403).json({ status: 403, message: 'Token invalid' });
            req.user = decode.data;
            next();
        } catch (error) {
            next(error);
        }
    }

    async verifyToken(req, res, next) {
        try {
            const { token } = req.body;
            if (!token) return res.status(401).json({ status: 403, message: 'Token not exist' });
            const decode = verifyRefreshToken(token);
            if (!decode.status) return res.status(401).json({ status: 401, message: 'Token expires' });
            req.user = decode.data;
            next();
        } catch (error) {
            next(error);
        }
    }

    checkRoleAdmin(req, res, next) {
        const { role } = req.user;
        if (role !== 'ADMIN') {
            return res.status(403).json({
                status: 403,
                message: 'Không đủ quyền hạn để thực hiện thao tác này',
            });
        }
        next(); // Authorized admin
    }
}

module.exports = new AuthMiddleware();
