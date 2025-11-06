const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth.middleware');
const role = require('../middlewares/role.middleware');
const User = require('../models/user.model');
const Exam = require('../models/exam.model');

router.get('/users', auth, role(['admin']), async (req, res) => {
    const users = await User.find().select('-passwordHash');
    res.json(users);
});

router.get('/exams', auth, role(['admin']), async (req, res) => {
    const exams = await Exam.find().populate('userId', 'name email');
    res.json(exams);
});

module.exports = router;
