const Exam = require('../models/exam.model');
const Reminder = require('../models/remainder.model');
const stack = require('../services/stack.service');

exports.createExam = async (req, res) => {
    const { title, subject, date, priority } = req.body;
    try {
        const exam = new Exam({
            title, subject, date, priority: priority || 0, userId: req.user._id
        });
        await exam.save();
        // push undo info to stack
        stack.push({ action: 'create', examId: exam._id });
        res.json(exam);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.updateExam = async (req, res) => {
    try {
        const exam = await Exam.findOneAndUpdate(
            { _id: req.params.id, userId: req.user._id },
            req.body,
            { new: true }
        );
        if (!exam) return res.status(404).json({ message: 'Exam not found' });
        stack.push({ action: 'update', examId: exam._id, data: req.body });
        res.json(exam);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.deleteExam = async (req, res) => {
    try {
        const exam = await Exam.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
        if (!exam) return res.status(404).json({ message: 'Exam not found' });
        stack.push({ action: 'delete', exam });
        // delete reminders for this exam
        await Reminder.deleteMany({ examId: exam._id });
        res.json({ message: 'Deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.listExams = async (req, res) => {
    try {
        const sortBy = req.query.sortBy || 'date'; // date, title, priority
        let sorts = {};
        if (sortBy === 'date') sorts = { date: 1 };
        if (sortBy === 'title') sorts = { title: 1 };
        if (sortBy === 'priority') sorts = { priority: -1 };
        const exams = await Exam.find({ userId: req.user._id }).sort(sorts);
        res.json(exams);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// undo last operation demo using stack
exports.undo = async (req, res) => {
    const entry = stack.pop();
    if (!entry) return res.status(400).json({ message: 'Nothing to undo' });
    try {
        if (entry.action === 'create') {
            await Exam.findByIdAndDelete(entry.examId);
        } else if (entry.action === 'delete') {
            const e = new Exam(entry.exam);
            await e.save();
        } else if (entry.action === 'update') {
            await Exam.findByIdAndUpdate(entry.examId, entry.data);
        }
        res.json({ message: 'Undo successful', entry });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};
