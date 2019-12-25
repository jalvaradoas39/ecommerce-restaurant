const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxLength: 64
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    hashedPassword: {
        type: String,
        required: true
    },
    about: {
        type: String,
        trim: true
    },
    role: {
        type: Number,
        default: 0
    },
    history: {
        type: Array,
        default: []
    }
}, { timestamps: true });


const User = mongoose.model('User', UserSchema);

module.exports = User;