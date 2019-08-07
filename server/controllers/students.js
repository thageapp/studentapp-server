const Students = require('../models/Students')
const Subjects = require('../models/Subjects')
const Notes = require('../models/Notes')
const Grades = require('../models/Grades')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt-nodejs')

const { authentication } = require('../config/jwt')

// Sign user function
function jwtSignUser (user) {
  const WEEK = 60 * 60 * 24 * 7
  return jwt.sign(user, authentication.jwtSecret, {
    expiresIn: WEEK
  })
}

// Compare password function
function comparePassword (password, hash) {
  return bcrypt.compareSync(password, hash)
}

// Hash password function
function hashPassword (password) {
  let salt = bcrypt.genSaltSync(10) // saltRounds
  return bcrypt.hashSync(password, salt)
}

// Register a student
exports.register = (req, res) => {
  // Save to database
  Students.create({
    name: req.body.name,
    surname: req.body.surname,
    birth_date: req.body.birthDate,
    gender: req.body.gender,
    email: req.body.email,
    phone_number: req.body.phoneNumber,
    class_name: req.body.className,
    password_hash: hashPassword(req.body.password)
  })
    .then(student => {
      if (!student) {
        // The email address or the phone number have been used by another user
        res.status(400).send({
          message: 'The email address or the phone number have been used by another user'
        })
        return
      }

      // Send the student's data and the access token
      res.send({
        student,
        token: jwtSignUser(JSON.parse(JSON.stringify(student)))
      })
    })
    .catch(error => {
      // There was an error trying to register
      res.status(500).send({
        msg: 'There was an error trying to register',
        error
      })
    })
}

// Student access
exports.access = (req, res) => {
  // Find student
  Students.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(student => {
      if (!student) {
        // The student does not exist
        res.sendStatus(403)
        return
      }

      if (!comparePassword(req.body.password, student.password_hash)) {
        // The login information was incorrect
        res.sendStatus(401)
        return
      }

      // Send the student's data and the access token
      res.send({
        student,
        token: jwtSignUser(JSON.parse(JSON.stringify(student)))
      })
    })
    .catch(error => {
      // Error trying to login
      res.status(500).send({
        msg: 'Error trying to login.',
        error
      })
    })
}

// Delete a student by id
exports.delete = (req, res) => {
  jwt.verify(req.token, authentication.jwtSecret, (error, authData) => {
    if (error) {
      // Not authorized
      res.sendStatus(403)
    } else {
      // Fetch all subjects for a student
      Subjects.findAll({
        where: {
          student_id: authData.id
        }
      })
        .then(subjects => {
          // For every subject delete its grades and then the subject itself
          for (let subject of subjects) {
            Grades.findAll({
              where: {
                subject_id: subject.id
              }
            })
              .then(grades => {
                for (let grade of grades) {
                  Grades.destroy({
                    where: { id: grade.id }
                  })
                }

                Subjects.destroy({
                  where: { id: subject.id }
                })
                  .then(() => {
                  })
                  .catch(error => {
                    res.status(500).send(error)
                  })
              })
              .catch(error => {
                res.status(500).send(error)
              })
          }

          // Delete all of student's notes
          Notes.findAll({
            where: {
              student_id: authData.id
            }
          })
            .then(notes => {
              for (let note of notes) {
                Notes.destroy({
                  where: { id: note.id }
                })
              }

              // Finally delete the student
              Students.destroy({
                where: { id: authData.id }
              })
                .then(() => {
                  res.sendStatus(202)
                })
                .catch(error => {
                  res.status(500).send(error)
                })
            })
            .catch(error => {
              res.status(500).send(error)
            })
        })
        .catch(error => {
          res.status(500).send(error)
        })
    }
  })
}
