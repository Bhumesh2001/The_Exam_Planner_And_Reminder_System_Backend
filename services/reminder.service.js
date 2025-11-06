const nodeCron = require('node-cron');
const Reminder = require('../models/remainder.model');
const Exam = require('../models/exam.model');
const User = require('../models/user.model');
const queue = require('../services/queue.service');

const checkIntervalMinutes = parseInt(process.env.REMINDER_CHECK_INTERVAL_MINUTES || '1');

// periodically load reminders from DB into queue if upcoming
async function loadUpcomingReminders() {
    const now = new Date();
    const window = new Date(now.getTime() + checkIntervalMinutes * 60 * 1000);
    // fetch reminders that are not sent and due within next interval
    const reminders = await Reminder.find({ sent: false, remindAt: { $lte: window } }).limit(100);
    for (const r of reminders) {
        // push to in-memory queue
        queue.enqueue(r);
    }
}

// worker that processes queue: "sends" reminders
async function processQueue() {
    while (!queue.isEmpty()) {
        const r = queue.dequeue();
        try {
            // mark as sent in db
            await Reminder.findByIdAndUpdate(r._id, { sent: true });
            // You can integrate email or push here. For now: log + simple record
            const exam = await Exam.findById(r.examId);
            const user = await User.findById(r.userId);
            console.log(`Reminder: ${user.email} - ${r.message || 'Exam reminder'} - Exam: ${exam?.title} at ${exam?.date}`);
            // Optionally send via webhook or socket
        } catch (err) {
            console.error('Reminder process error', err);
        }
    }
}

// scheduler that loads and processes
function startReminderScheduler() {
    // every minute (or as configured)
    nodeCron.schedule(`*/${checkIntervalMinutes} * * * *`, async () => {
        try {
            await loadUpcomingReminders();
            await processQueue();
        } catch (err) {
            console.error('Reminder scheduler error', err);
        }
    });
    console.log('Reminder scheduler started');
}

module.exports = {
    startReminderScheduler,
    loadUpcomingReminders,
    processQueue
};
