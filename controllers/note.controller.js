const Note = require('../models/note.model');

// recursion helper to build nested structure
async function buildNoteTree(note) {
    const children = await Note.find({ parentNote: note._id });
    const result = {
        id: note._id,
        title: note.title,
        content: note.content,
        children: []
    };
    for (const c of children) {
        result.children.push(await buildNoteTree(c));
    }
    return result;
}

exports.createNote = async (req, res) => {
    const { title, content, parentNote } = req.body;
    try {
        const note = new Note({ title, content, userId: req.user._id, parentNote: parentNote || null });
        await note.save();
        if (parentNote) {
            await Note.findByIdAndUpdate(parentNote, { $push: { children: note._id } });
        }
        res.json(note);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getNoteTree = async (req, res) => {
    try {
        const rootNotes = await Note.find({ userId: req.user._id, parentNote: null });
        const tree = [];
        for (const n of rootNotes) {
            tree.push(await buildNoteTree(n));
        }
        res.json(tree);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.deleteNoteRecursively = async (req, res) => {
    const { id } = req.params;
    try {
        async function deleteRec(id) {
            const note = await Note.findById(id);
            if (!note) return;
            for (const cId of note.children) await deleteRec(cId);
            await Note.findByIdAndDelete(id);
        }
        await deleteRec(id);
        res.json({ message: 'Deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};
