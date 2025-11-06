const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExamSchema = new Schema({
    title: { type: String },
    subject: { type: String },
    date: { type: Date },
    priority: { type: Number, default: 0 }, // higher number = higher priority
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    notes: [{ type: Schema.Types.ObjectId, ref: 'Note' }],
}, {
    timestamps: true,
});

module.exports = mongoose.model('Exam', ExamSchema);
