require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
const Exam = require('../models/exam.model');
const Note = require('../models/note.model');
const Reminder = require('../models/remainder.model');

const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/exam_planner';

async function run() {
    await mongoose.connect(mongoUri);
    console.log('Connected for seeding');
    await User.deleteMany({});
    await Exam.deleteMany({});
    await Note.deleteMany({});
    await Reminder.deleteMany({});

    const adminPass = bcrypt.hashSync('adminpass', 10);
    const userPass = bcrypt.hashSync('userpass', 10);

    const admin = new User({
        name: 'Admin',
        email: 'admin@admin.com',
        passwordHash: adminPass,
        role: 'admin'
    });
    const user = new User({
        name: 'Test User',
        email: 'user123@gmail.com',
        passwordHash: userPass,
        role: 'user'
    });

    await admin.save();
    await user.save();

    const exam1 = new Exam({
        title: 'Math Final',
        subject: 'Mathematics',
        date: new Date(Date.now() + 5 * 24 * 3600 * 1000),
        priority: 3,
        userId: user._id
    });
    const exam2 = new Exam({
        title: 'Physics Mid',
        subject: 'Physics',
        date: new Date(Date.now() + 10 * 24 * 3600 * 1000),
        priority: 2,
        userId: user._id
    });

    await exam1.save();
    await exam2.save();

    const noteRoot = new Note({
        title: 'Exam Tips',
        content: 'Main tips',
        userId: user._id
    });
    await noteRoot.save();
    const noteChild = new Note({
        title: 'Math Tip',
        content: 'Revise integrals',
        userId: user._id,
        parentNote: noteRoot._id
    });
    await noteChild.save();
    noteRoot.children.push(noteChild._id);
    await noteRoot.save();

    const reminder = new Reminder({
        examId: exam1._id,
        userId: user._id,
        remindAt: new Date(Date.now() + 2 * 60 * 1000),
        message: 'Reminder: Math exam in 5 days'
    });
    await reminder.save();

    console.log('Seeding done. Admin/admin@example.com adminpass, User user@example.com userpass');
    process.exit(0);
};

run().catch(e => {
    console.error(e);
    process.exit(1);
});
