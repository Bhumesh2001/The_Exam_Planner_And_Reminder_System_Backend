const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NoteSchema = new Schema({
    title: { type: String },
    content: { type: String },
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    parentNote: { type: Schema.Types.ObjectId, ref: 'Note', default: null }, // nested notes support
    children: [{ type: Schema.Types.ObjectId, ref: 'Note' }],
}, {
    timestamps: true,
});

module.exports = mongoose.model('Note', NoteSchema);
