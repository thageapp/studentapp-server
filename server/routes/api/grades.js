const express = require('express')
const { verifyToken } = require('../../middleware/index.js')

const router = express.Router()

const grades = require('../../controllers/grades')

// Add a new grade
router.post('/', verifyToken, grades.create)

// Retrieve all grades by subject
router.get('/', verifyToken, grades.findAllBySubject)

// Retrieve a single grade by id
router.get('/:gradeId', verifyToken, grades.findByPk)

// Update a grade with id
router.put('/:gradeId', verifyToken, grades.update)

// Delete a grade with id
router.delete('/:gradeId', verifyToken, grades.delete)

module.exports = router
