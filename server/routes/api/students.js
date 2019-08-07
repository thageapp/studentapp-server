const express = require('express')
const router = express.Router()
const { verifyToken } = require('../../middleware/index.js')

const students = require('../../controllers/students')

// Register student route
router.post('/register', students.register)

// Student access route
router.post('/access', students.access)

// Delete a student with id
router.delete('/', verifyToken, students.delete)

module.exports = router
