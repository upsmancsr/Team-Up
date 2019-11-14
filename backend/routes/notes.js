const express = require('express');
const router = express.Router();
// Import MongoDB models:
const User = require('../schemas/User');
const Team = require('../schemas/Team');
const Note = require('../schemas/Note');

// Geat all notes for a team:
router.get('/:teamId', async (req, res) => {
    try {
        const { teamId } = req.params;
        const notes = await Note.find({ team: teamId }).populate('author taggedUsers');
        res.status(200).json(notes);
    }
    catch(error) {
        console.log(error);
        res.status(500).json(error);
    }
});

// Create a new note:
router.post('/newnote', async (req, res) => {
    try {
        const { authorId: author, teamId: team, title, content, taggedUsers } = req.body;

        const newNote = new Note({
            title,
            content,
            author,
            team
        });

        // Push tagged users (_id) into newNote taggedUsers array field:
        if (taggedUsers.length) {
            taggedUsers.forEach(id => {
                newNote.taggedUsers.push(id);
            });
        }

        // save new note in db:
        const note = await newNote.save();

        // Get all notes for the team (to include new note):
        const notes = await Note.find({ team }).populate('author taggedUsers');

        res.status(200).json({ message: 'Note saved in database.', notes });
    }
    catch(error) {
        console.log(error);
        res.status(500).json(error);
    }
});

module.exports = router;