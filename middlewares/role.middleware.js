module.exports = (roles = []) => (req, res, next) => {
    if (!roles.length) return next();
    if (!req.user) return res.status(403).json({ message: 'Forbidden' });
    if (!roles.includes(req.user.role)) return res.status(403).json({ message: 'Forbidden' });
    next();
};
