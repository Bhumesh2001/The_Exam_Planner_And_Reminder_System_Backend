const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth.middleware');
const controller = require('../controllers/reminder.controller');

router.post('/', auth, controller.createReminder);
router.get('/', auth, controller.listReminders);

module.exports = router;
