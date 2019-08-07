const Subjects = require('../models/Subjects')
const jwt = require('jsonwebtoken')
const { authentication } = require('../config/jwt')

// Create a subject
exports.create = (req, res) => {
  jwt.verify(req.token, authentication.jwtSecret, (error, authData) => {
    if (error) {
      // Not authorized
      res.sendStatus(403)
    } else {
      // Save to database
      Subjects.create({
        name: req.body.name,
        student_id: authData.id
      })
        .then(subject => {
          // Send created subject to client
          res.send(subject)
        })
        .catch(error => {
          // There was an error creating the subject
          res.status(500).send({
            error,
            msg: 'There was an error creating the subject'
          })
        })
    }
  })
}

// Fetch subjects by student
exports.findAllByStudent = (req, res) => {
  jwt.verify(req.token, authentication.jwtSecret, (error, authData) => {
    if (error) {
      // Not authorized
      res.sendStatus(403)
    } else {
      Subjects.findAll({
        where: {
          student_id: authData.id
        }
      })
        .then(subjects => {
          // Send subjects to client
          res.send(subjects)
        })
        .catch(error => {
          // There was an error retrieving the subjects
          res.status(500).send({
            error,
            msg: 'There was an error retrieving the subjects'
          })
        })
    }
  })
}

// Delete a subject
exports.delete = (req, res) => {
  jwt.verify(req.token, authentication.jwtSecret, (error, authData) => {
    if (error) {
      // Not authorized
      res.sendStatus(403)
    } else {
      Subjects.findByPk(req.params.subjectId)
        .then(subject => {
          if (subject.student_id === authData.id) {
            Subjects.destroy({
              where: { id: req.params.subjectId }
            })
              .then(() => {
                // The request is accepted
                res.sendStatus(202)
              })
              .catch(error => {
                // There are grades for the subject
                if (error.name === 'SequelizeForeignKeyConstraintError') {
                  res.status(500).send({
                    error,
                    name: 'SequelizeForeignKeyConstraintError'
                  })
                }
              })
          } else {
            // Student does not own the subject
            res.sendStatus(401)
          }
        })
        .catch(error => {
          // There was an error deleting the subject
          res.status(500).send({
            error,
            msg: 'There was an error deleting the subject'
          })
        })
    }
  })
}
