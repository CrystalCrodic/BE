const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, 'Tên sản phẩm là bắt buộc'],
        },
        summary: {
            type: String,
        },
        description: {
            type: String,
        },
        price: {
            type: Number,
            default: 0,
            min: [0, 'Giá phải lớn hơn hoặc bằng 0'],
        },
        category: {
            type: mongoose.Types.ObjectId,
            ref: 'category',
        },
        rate: [
            {
                user: { type: mongoose.Types.ObjectId, ref: 'user' },
                ratting: { type: Number, default: 0 },
            },
        ],
        sale: { type: Number, min: 0, max: [100, 'Giảm giá 100% là giá trị tối đa'], default: 0 },
        shape: {
            width: { type: Number, default: 0 },
            height: { type: Number, default: 0 },
            weight: { type: Number, default: 0 },
        },
        images: [{ type: String }],
        capture: { type: String },
        inventory: { type: Number, min: 0 },
    },
    { timestamps: true }
);

const PRODUCT = mongoose.model('product', ProductSchema);

module.exports = PRODUCT;
