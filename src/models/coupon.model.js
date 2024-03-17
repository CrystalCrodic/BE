const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CouponSchema = new Schema({
    code: {
        type: String,
        required: [true, 'Cần phải có mã code'],
        min: 6,
        max: 12,
    },
    date: {
        type: Date,
        default: Date.now(),
    },
});

const COUPON = mongoose.model('coupon', CouponSchema);

module.exports = COUPON;
