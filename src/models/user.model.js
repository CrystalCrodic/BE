const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstname: {
        type: String,
    },
    lastname: {
        type: String,
    },
    email: {
        type: String,
        validate: {
            validator: (value) => {
                return isEmail(value);
            },
            message: (props) => `${props.value} is not a valid email address!`,
        },
        required: [true, 'Email is required'],
        unique: [true, 'Email already exists'],
    },
    address: {
        address: { type: String },
        province: { name: { type: String }, code: Number },
        district: { name: { type: String }, code: Number },
        ward: { name: { type: String }, code: Number },
    },
    role: {
        type: String,
        enum: ['USER', 'ADMIN'],
        default: 'USER',
    },
    phone: {
        type: String,
        validate: {
            validator: (value) => {
                return isMobilePhone(value, 'vi-VN');
            },
            message: (props) => `${props.value} is not a valid phone number!`,
        },
        max: [14, "Phone number can't be longer than 14 characters"],
    },
    sex: {
        type: String,
        enum: ['Nam', 'Nữ', 'Khác'],
        max: [4, "Sex can't be longer than 4 characters"],
    },
    password: {
        type: String,
        min: [8, "Password can't be shorter than 8 characters"],
    },
    googleId: {
        type: String,
    },
    provider: {
        type: String,
        enum: ['local', 'google'],
        default: 'local',
    },
    cart: [
        {
            product: { type: mongoose.Types.ObjectId, ref: 'product' },
            quantity: { type: Number },
            price: { type: Number },
        },
    ],
});

UserSchema.pre('save', function (next) {
    if (!this.password && this.provider === 'google') return next();
    if (!this.isModified('password')) return next();
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(this.password, salt);
    this.password = hashPassword;
    next();
});

const USER = mongoose.model('user', UserSchema);

module.exports = USER;
