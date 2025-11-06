const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: { type: String },
    email: { type: String },
    passwordHash: { type: String },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
}, {
    timestamps: true,
});

module.exports = mongoose.model('User', UserSchema);
