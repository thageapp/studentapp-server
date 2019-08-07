const Notes = require('../models/Notes')
const jwt = require('jsonwebtoken')
const { authentication } = require('../config/jwt')

// Create a note
exports.create = (req, res) => {
  jwt.verify(req.token, authentication.jwtSecret, (error, authData) => {
    if (error) {
      // Not authorized
      res.sendStatus(403)
    } else {
      // Save to database
      Notes.create({
        note: req.body.note,
        student_id: authData.id,
        date: req.body.date,
        note_type: req.body.noteType
      })
        .then(note => {
          // Send created note to client
          res.send(note)
        })
        .catch(error => {
          // There was an error creating the note
          res.status(500).send({
            error,
            msg: 'There was an error creating the note'
          })
        })
    }
  })
}

// Fetch Notes by student id
exports.findAllByStudent = (req, res) => {
  jwt.verify(req.token, authentication.jwtSecret, (error, authData) => {
    if (error) {
      // Not authorized
      res.sendStatus(403)
    } else {
      Notes.findAll({
        where: {
          student_id: authData.id
        }
      })
        .then(notes => {
          // Send notes to client
          res.send(notes)
        })
        .catch(error => {
          // There was an error retrieving the notes
          res.status(500).send({
            error,
            msg: 'There was an error retrieving the notes'
          })
        })
    }
  })
}

// Find a note by id
exports.findByPk = (req, res) => {
  jwt.verify(req.token, authentication.jwtSecret, (error, authData) => {
    if (error) {
      // Not authorized
      res.sendStatus(403)
    } else {
      Notes.findByPk(req.params.noteId)
        .then(note => {
          if (note.student_id === authData.id) {
            // Sedn note to client
            res.send(note)
          } else {
            // Student does not own the note
            res.sendStatus(401)
          }
        })
        .catch(error => {
          // There was an error retrieving the note
          res.status(500).send({
            error,
            msg: 'There was an error retrieving the note'
          })
        })
    }
  })
}

// Update a note
exports.update = (req, res) => {
  jwt.verify(req.token, authentication.jwtSecret, (error, authData) => {
    if (error) {
      // Not authorized
      res.sendStatus(403)
    } else {
      Notes.update({
        note: req.body.note,
        student_id: authData.id,
        date: req.body.date,
        note_type: req.body.noteType
      }, {
        where: { id: req.params.noteId }
      })
        .then(() => {
          // The request is accepted
          res.sendStatus(202)
        })
        .catch(error => {
          // There was an error updating the note
          res.status(500).send({
            error,
            msg: 'There was an error updating the note'
          })
        })
    }
  })
}

// Delete a note by id
exports.delete = (req, res) => {
  jwt.verify(req.token, authentication.jwtSecret, (error, authData) => {
    if (error) {
      // Not authorized
      res.sendStatus(403)
    } else {
      Notes.findByPk(req.params.noteId)
        .then(note => {
          if (note.student_id === authData.id) {
            Notes.destroy({
              where: { id: req.params.noteId }
            })
              .then(() => {
                // The request is accepted
                res.sendStatus(202)
              })
              .catch(error => {
                // There was an error deleting the note
                res.status(500).send({
                  error,
                  msg: 'There was an error deleting the note'
                })
              })
          } else {
            // The student does not own the note
            res.sendStatus(401)
          }
        })
        .catch(error => {
          // There was an error retrieving the note
          res.status(500).send({
            error,
            msg: 'There was an error retrieving the note'
          })
        })
    }
  })
}
