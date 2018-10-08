const express = require('express');
const _ = require('lodash');
const models = require('../models');

const router = express.Router();

// Index
router.get('/', (req, res) => {
  models.Notebook.findAll({ order: [['createdAt', 'DESC']] })
    .then(notebooks => res.json(notebooks))
    .catch(err => res.status(500).json({ error: err.message }));
});

  // Create a new notebook record in the database
router.post('/', (req, res) => {
  models.Notebook.create(req.body)
     .then(notebooks => res.json(notebooks))
   .catch(err => res.status(422).json({ error: err.message }));
});
//Show
router.get('/:notebookId', (req, res) => {
  // Return the specified notebook record from the database
  models.Notebook.findById(req.params.notebookId)
    .then(notebooks => res.json(notebooks))
    .catch(err => res.status(500).json({ error: err.message }));
});

// Destroy
router.delete('/:notebookId', (req, res) => {
  // Delete the specified notebook record from the database
  models.Notebook.findById(req.params.notebookId)
    .then(notebooks => notebooks.destroy())
    .then(() => res.json({}))
    .catch(err => res.status(500).json({ error: err.message }));
});

// Update
router.put('/:notebookId', (req, res) => {
  // Update the specified post record in the database
  models.Notebook.findById(req.params.notebookId)
    .then(notebooks => notebooks.update(req.body))
    .then(notebooks => res.json(notebooks))
    .catch(err => res.status(422).json({ error: err.message }));
});


/* *** TODO: Fill in the API endpoints for notebooks *** */
//Returns a list of all notes for a particular notebook
router.get('/:notebookId/notes', (req, res) => {
  models.Note.findAll({where: {notebookId: req.params.notebookId} })
    .then(notes => res.json(notes))
    .catch(err => res.status(500).json({ error: err.message }));
});


module.exports = router;
