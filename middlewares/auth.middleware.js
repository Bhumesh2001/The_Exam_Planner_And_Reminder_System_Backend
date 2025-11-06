const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const { JWT_SECRET } = process.env;

module.exports = async (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token' });
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-passwordHash');
        if (!req.user) return res.status(401).json({ message: 'Invalid token' });
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Token error' });
    }
};
