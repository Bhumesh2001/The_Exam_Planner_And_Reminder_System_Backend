const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth.middleware');
const examController = require('../controllers/exam.controller');

router.post('/', auth, examController.createExam);
router.get('/', auth, examController.listExams);
router.put('/:id', auth, examController.updateExam);
router.delete('/:id', auth, examController.deleteExam);
router.post('/undo', auth, examController.undo);

module.exports = router;
