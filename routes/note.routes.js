const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth.middleware');
const noteController = require('../controllers/note.controller');

router.post('/', auth, noteController.createNote);
router.get('/', auth, noteController.getNoteTree);
router.delete('/:id', auth, noteController.deleteNoteRecursively);

module.exports = router;
