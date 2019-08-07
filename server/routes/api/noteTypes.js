const express = require('express')
const { verifyToken } = require('../../middleware/index.js')

const router = express.Router()

const noteTypes = require('../../controllers/noteTypes')

// Retrieve all noteTypes
router.get('/', verifyToken, noteTypes.findAll)

module.exports = router
