const GradeTypes = require('../models/GradeTypes')
const jwt = require('jsonwebtoken')
const { authentication } = require('../config/jwt')

// Fetch GradeTypes
exports.findAll = (req, res) => {
  jwt.verify(req.token, authentication.jwtSecret, (error, authData) => {
    if (error) {
      // Not authorized
      res.sendStatus(403)
    } else {
      GradeTypes.findAll()
        .then(gradeTypes => {
          // Send gradeTypes to client
          res.send(gradeTypes)
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
