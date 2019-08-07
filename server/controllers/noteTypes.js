const NoteTypes = require('../models/NoteTypes')
const jwt = require('jsonwebtoken')
const { authentication } = require('../config/jwt')

// Fetch NoteTypes
exports.findAll = (req, res) => {
  jwt.verify(req.token, authentication.jwtSecret, (error, authData) => {
    if (error) {
      // Not authorized
      res.sendStatus(403)
    } else {
      NoteTypes.findAll()
        .then(noteTypes => {
          // Send noteTypes to client
          res.send(noteTypes)
        })
        .catch(error => {
          // There was an error retrieving the grade types
          res.status(500).send({
            error,
            msg: 'There was an error retrieving the grade types'
          })
        })
    }
  })
}
