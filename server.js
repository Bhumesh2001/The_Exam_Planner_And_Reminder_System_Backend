require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db.config');
const reminderWorker = require('./services/reminder.service');

const authRoutes = require('./routes/auth.routes');
const examRoutes = require('./routes/exam.routes');
const noteRoutes = require('./routes/note.routes');
const reminderRoutes = require('./routes/remainder.routes');
const adminRoutes = require('./routes/admin.routes');
const apiRoutes = require('./routes/api.routes');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/exams', examRoutes);
app.use('/api/notes', noteRoutes);
app.use('/api/reminders', reminderRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/external', apiRoutes);

const PORT = process.env.PORT || 5000;

connectDB(process.env.MONGO_URI || 'mongodb://localhost:27017/exam_planner')
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server started on ${PORT}`);
            reminderWorker.startReminderScheduler();
        });
    })
    .catch(err => {
        console.error('DB connection error', err);
    });
