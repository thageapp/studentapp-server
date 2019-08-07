const express = require('express')
const { verifyToken } = require('../../middleware/index.js')

const router = express.Router()

const gradeTypes = require('../../controllers/gradeTypes')

// Retrieve all gradeTypes
router.get('/', verifyToken, gradeTypes.findAll)

module.exports = router
