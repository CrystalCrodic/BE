const createHttpError = require('http-errors');
const CATEGORY = require('../models/category.model');
const { trim } = require('validator');

class CategoryService {
    async create(req) {
        try {
            const { name } = req.body;
            if (!name) throw createHttpError(400, 'Vui lòng cung cấp tên thể loại');
            const newCategory = await CATEGORY.create({ name: trim(name.toLowerCase()) });
            return {
                status: 201,
                message: 'Tạo danh mục thành công',
                data: {
                    category: newCategory,
                },
            };
        } catch (error) {
            throw error;
        }
    }

    async getAll(req) {
        try {
            const categories = await CATEGORY.find({});
            return {
                status: 200,
                message: 'Lấy danh sách danh mục thành công',
                data: {
                    categories,
                },
            };
        } catch (error) {
            throw error;
        }
    }

    async get(req) {
        try {
            const { id } = req.params;
            const category = await CATEGORY.findById(id);
            return {
                status: 200,
                message: `Lấy thông tin danh mục thành công`,
                data: {
                    category,
                },
            };
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new CategoryService();
