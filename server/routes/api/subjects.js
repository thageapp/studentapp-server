const express = require('express')
const { verifyToken } = require('../../middleware/index.js')

const router = express.Router()

const subjects = require('../../controllers/subjects')

// Add a new subject
router.post('/', verifyToken, subjects.create)

// Retrieve all subjects by student
router.get('/', verifyToken, subjects.findAllByStudent)

// Delete a subject with id
router.delete('/:subjectId', verifyToken, subjects.delete)

module.exports = router
