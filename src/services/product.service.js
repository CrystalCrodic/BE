const createHttpError = require('http-errors');
const PRODUCT = require('../models/product.model');
const { paginate } = require('../utils/var');
const cloudinary = require('cloudinary').v2;

class ProductService {
    async create(req) {
        const { title, category } = req.body;
        const files = req.files;
        try {
            const arrImage = files.images.map((image) => image.path);
            if (!title) throw createHttpError(400, 'Cần có tên sản phẩm');
            if (!category) throw createHttpError(400, 'Cần danh mục sản phẩm cho sản phẩm vừa tạo');
            const newProduct = await PRODUCT.create({ ...req.body, capture: files.capture[0].path, images: arrImage });
            return {
                status: 201,
                message: 'Tạo sản phẩm mới thành công',
                data: {
                    product: newProduct,
                },
            };
        } catch (error) {
            if (files) {
                const getCaptureID = files.capture[0].filename.split('/')[1];
                const getImagesID = files.images.map((image) => image.filename);
                try {
                    await cloudinary.uploader.destroy(getCaptureID);
                    for (const id of getImagesID) {
                        await cloudinary.uploader.destroy(id);
                    }
                    throw error;
                } catch (errorCloudinary) {
                    throw errorCloudinary;
                }
            }
            throw error;
        }
    }
    async getById(req) {
        try {
            const { id } = req.params;
            const product = await PRODUCT.findById(id).populate('category');
            if (!product) throw createHttpError(404, 'Sản phẩm không tồn tại');
            return {
                status: 200,
                message: `Lấy thông tin sản phẩm ${product?.title} thành công`,
                data: {
                    product,
                },
            };
        } catch (error) {
            throw error;
        }
    }
    async getAllProduct(req) {
        try {
            const { DEFAULT_LIMIT, DEFAULT_PAGE } = paginate.product;
            const { page = DEFAULT_PAGE, limit = DEFAULT_LIMIT } = req.query;
            const skip = (+page - 1) * +limit;
            const products = await PRODUCT.find({}).skip(skip).limit(limit).populate('category');
            const total = await PRODUCT.countDocuments();
            return {
                status: 200,
                message: 'Lấy danh sách sản phẩm thành công',
                data: {
                    products,
                    total,
                    totalPage: Math.ceil(total / limit),
                },
            };
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new ProductService();

// const splitAvatar = avatar.split('/');
// const public_id =
// splitAvatar[splitAvatar.length - 2] + '/' + splitAvatar[splitAvatar.length - 1].split('.')[0];
// await cloudinary.uploader.destroy(public_id);
