const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BillSchema = new Schema({
    products: [
        {
            pid: { type: mongoose.Types.ObjectId, ref: 'product' },
            price: Number,
            quantity: Number,
        },
    ],
    total: {
        type: Number,
        required: [true, 'Yêu cầu phải có tổng tiền cần thanh toán'],
        min: 0,
    },
    coupon: { type: mongoose.Types.ObjectId, ref: 'coupon' },
    user: { type: mongoose.Types.ObjectId, ref: 'user' },
    address: {
        address: { type: String, required: [true, 'Vui lòng cung cấp số nhà, tên đường'] },
        province: { name: { type: String, required: [true, 'Vui lòng cung cấp tỉnh, thành phố'] }, code: Number },
        district: { name: { type: String, required: [true, 'Vui lòng cung cấp quận, huyện'] }, code: Number },
        ward: { name: { type: String, required: [true, 'Vui lòng cung cấp phường, xã'] }, code: Number },
    },
    payment: { type: String, enum: ['ONLINE', 'OFFLINE'], default: 'OFFLINE' },
});

const BILL = mongoose.model('bill', BillSchema);

module.exports = BILL;
