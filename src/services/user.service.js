const createHttpError = require('http-errors');
const PRODUCT = require('../models/product.model');
const USER = require('../models/user.model');
class UserService {
    async addCart(req) {
        try {
            const { pid, quantity, price } = req.body;
            const { id } = req.user;
            const findProduct = await PRODUCT.findById(pid);
            if (!findProduct) throw createHttpError(404, 'Sản phẩm không tồn tại');
            const user = await USER.findByIdAndUpdate(
                id,
                { $push: { cart: { product: pid, quantity, price } } },
                { new: true }
            ).populate('cart.product');
            if (!user) throw createHttpError(404, 'Không tìm thấy người dùng');
            const totalPrice = user.cart.reduce((total, money) => total + money.price, 0);
            return {
                status: 201,
                message: 'Thêm sản phẩm thành công',
                data: {
                    user,
                    quantity: +quantity,
                    price: +price,
                    totalPrice,
                },
            };
        } catch (error) {
            throw error;
        }
    }
    async getUser(req) {
        try {
            const { id } = req.params;
            const token = req.user;
            if (id !== token.id) throw createHttpError(404, 'Người dùng không hợp lệ');
            const user = await USER.findById(id).populate('cart.product');
            if (!user) throw createHttpError(404, 'Người dùng không tồn tại');
            return {
                status: 200,
                message: 'Lấy thông tin người dùng thành công',
                data: {
                    user,
                },
            };
        } catch (error) {
            throw error;
        }
    }
    async deleteCart(req) {
        try {
            const { id } = req.user;
            const { id: cartUserId } = req.params;
            const { productId } = req.body;
            if (id !== cartUserId) throw createHttpError(404, 'Tham số không hợp lệ');
            const updateCart = await USER.findByIdAndUpdate(
                id,
                { $pull: { cart: { product: productId } } },
                { new: true }
            );
            if (!updateCart) throw createHttpError(404, 'Không tìm thấy sản phẩm trong giỏ hàng');
            return {
                status: 201,
                message: 'Cập nhật giỏ hàng thành công',
                data: {
                    user: updateCart,
                },
            };
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new UserService();
