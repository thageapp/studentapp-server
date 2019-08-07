const express = require('express')
const { verifyToken } = require('../../middleware/index.js')

const router = express.Router()

const notes = require('../../controllers/notes')

// Add a new note
router.post('/', verifyToken, notes.create)

// Retrieve all notes by student id
router.get('/', verifyToken, notes.findAllByStudent)

// Retrieve a single note by id
router.get('/:noteId', verifyToken, notes.findByPk)

// Update a note with id
router.put('/:noteId', verifyToken, notes.update)

// Delete a note with id
router.delete('/:noteId', verifyToken, notes.delete)

module.exports = router
