const createHttpError = require('http-errors');
const USER = require('../models/user.model');
const { generateAccessToken, generateRefreshToken, checkPassword } = require('../utils/auth');

class AuthService {
    // Register Account
    async register(req) {
        try {
            const { firstname, lastname, email, password, phone } = req.body;
            if (!firstname) throw createHttpError(400, 'Thiếu giá trị firstname');
            if (!lastname) throw createHttpError(400, 'Thiếu giá trị lastname');
            if (!email) throw createHttpError(400, 'Thiếu giá trị email');
            if (!password) throw createHttpError(400, 'Thiếu giá trị password');
            const user = new USER({ firstname, lastname, email, password, phone });
            const new_user = await user.save();
            return {
                status: 201,
                message: `Đăng ký tài khoản thành công`,
                data: {
                    user: new_user,
                },
            };
        } catch (error) {
            throw error;
        }
    }

    // Login Account
    async login(req) {
        try {
            const { email, googleId } = req.body;
            const body = req.body;
            if (!email) throw createHttpError(400, 'Thiếu tham số email');
            if (!body.password && googleId) {
                let accountGoogle = await USER.findOne({ googleId });
                if (!accountGoogle) {
                    const findAccountWithEmail = await USER.findOne({ email });
                    if (findAccountWithEmail) {
                        throw createHttpError(404, 'Email đã được đăng ký.');
                    }
                    accountGoogle = await USER.create({
                        email,
                        googleId,
                        provider: 'google',
                        firstname: body?.firstname || null,
                        firstname: body?.lastname || null,
                    });
                }
                const accessToken = generateAccessToken({
                    id: accountGoogle._id,
                    email: accountGoogle.email,
                    role: accountGoogle.role,
                });
                const refreshToken = generateRefreshToken({
                    id: accountGoogle._id,
                    email: accountGoogle.email,
                    role: accountGoogle.role,
                });
                return {
                    status: 200,
                    message: 'Đăng Nhập Thành Công',
                    data: {
                        user: accountGoogle,
                        access_token: accessToken,
                        refresh_token: refreshToken,
                    },
                };
            } else if (!body.password && !googleId) {
                throw createHttpError(400, 'Thiếu các tham số bắt buộc');
            } else {
                const user = await USER.findOne({ email });
                if (!user) throw createHttpError(404, 'Tài khoản không tồn tại');
                const isValid = checkPassword(body.password, user.password);
                if (!isValid) throw createHttpError(404, 'Tài khoản hoặc mật khẩu không chính xác');
                const accessToken = generateAccessToken({
                    id: user._id,
                    email: user.email,
                    role: user.role,
                });
                const refreshToken = generateRefreshToken({
                    id: user._id,
                    email: user.email,
                    role: user.role,
                });
                return {
                    status: 200,
                    message: 'Đăng nhập thành công',
                    data: {
                        user,
                        access_token: accessToken,
                        refresh_token: refreshToken,
                    },
                };
            }
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new AuthService();
