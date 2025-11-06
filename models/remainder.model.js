const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReminderSchema = new Schema({
    examId: { type: Schema.Types.ObjectId, ref: 'Exam' },
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    remindAt: { type: Date },
    message: { type: String },
    sent: { type: Boolean, default: false },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Reminder', ReminderSchema);
