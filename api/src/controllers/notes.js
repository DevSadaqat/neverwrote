const express = require('express');
const _ = require('lodash');
const models = require('../models');

const router = express.Router();

/* *** TODO: Fill in the API endpoints for notes *** */
//Returns a list of all notes.
router.get('/', (req, res) => {
  models.Note.findAll({ order: [['createdAt', 'DESC']] })
    .then(notes => res.json(notes))
    .catch(err => res.status(500).json({ error: err.message }));
});

//Creates a new note using the posted data. The notebookId
//attribute shall specify which notebook it belongs to.
//Returns the new note
router.post('/', (req, res) => {
  models.note.create(req.body)
     .then(notes => res.json(notes))
   .catch(err => res.status(422).json({ error: err.message }));
});

//Returns a single note by ID.
router.get('/:noteId', (req, res) => {
  // Return the specified notes record from the database
  models.Note.findById(req.params.noteId)
    .then(notes => res.json(notes))
    .catch(err => res.status(500).json({ error: err.message }));
});

// Destroy
router.delete('/:noteId', (req, res) => {
  // Delete the specified notes record from the database
  models.Note.findById(req.params.noteId)
    .then(notes => notes.destroy())
    .then(() => res.json({}))
    .catch(err => res.status(500).json({ error: err.message }));
});

// Update
router.put('/:noteId', (req, res) => {
  // Update the specified post record in the database
  models.Note.findById(req.params.noteId)
    .then(notes => notes.update(req.body))
    .then(notes => res.json(notes))
    .catch(err => res.status(422).json({ error: err.message }));
});
module.exports = router;

