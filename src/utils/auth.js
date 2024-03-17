const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class Authentication {
    checkPassword(password, hash) {
        return bcrypt.compareSync(password, hash);
    }
    generateAccessToken(data, timeout = '15d') {
        return jwt.sign(data, process.env.ACCESS_TOKEN_KEY, { expiresIn: timeout });
    }
    generateRefreshToken(data, timeout = '30d') {
        return jwt.sign(data, process.env.REFRESH_TOKEN_KEY, { expiresIn: timeout });
    }
    verifyRefreshToken(token) {
        let status = false;
        let data = null;
        jwt.verify(token, process.env.REFRESH_TOKEN_KEY, (err, decode) => {
            if (!err) {
                status = true;
                data = decode;
            }
        });
        return {
            status,
            data,
        };
    }
    verifyAccessToken(token) {
        let status = false;
        let data = null;
        jwt.verify(token, process.env.ACCESS_TOKEN_KEY, (err, decode) => {
            if (!err) {
                status = true;
                data = decode;
            }
        });
        return {
            status,
            data,
        };
    }
}

module.exports = new Authentication();
