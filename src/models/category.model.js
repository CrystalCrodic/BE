const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Tên danh mục là bắt buộc'],
            unique: [true, 'Đã tồn tại danh mục trong hệ thế'],
        },
    },
    { timestamps: true }
);

const CATEGORY = mongoose.model('category', CategorySchema);

module.exports = CATEGORY;
