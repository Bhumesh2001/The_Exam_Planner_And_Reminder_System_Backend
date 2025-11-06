const Reminder = require('../models/exam.model');
const Exam = require('../models/exam.model');

// schedule a reminder for an exam
exports.createReminder = async (req, res) => {
    const { examId, remindAt, message } = req.body;
    try {
        // validate exam
        const exam = await Exam.findById(examId);
        if (!exam) return res.status(404).json({ message: 'Exam not found' });
        if (String(exam.userId) !== String(req.user._id)) {
            return res.status(403).json({ message: 'Not allowed' });
        }
        const reminder = new Reminder({ examId, userId: req.user._id, remindAt: new Date(remindAt), message });
        await reminder.save();
        res.json(reminder);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.listReminders = async (req, res) => {
    const reminders = await Reminder.find({ userId: req.user._id }).populate('userId', 'name email');
    res.json(reminders);
};
