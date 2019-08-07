const Subjects = require('../models/Subjects')
const Grades = require('../models/Grades')
const jwt = require('jsonwebtoken')
const { authentication } = require('../config/jwt')

// Create a grade
exports.create = (req, res) => {
  jwt.verify(req.token, authentication.jwtSecret, (error, authData) => {
    if (error) {
      // Not authorized
      res.sendStatus(403)
    } else {
      Subjects.findByPk(req.body.subjectId)
        .then(subject => {
          if (subject.student_id === authData.id) {
            // Save to database
            Grades.create({
              grade: req.body.grade,
              date: req.body.date,
              grade_type: req.body.gradeType,
              subject_id: subject.id
            })
              .then(grade => {
                // Send created grade to client
                res.send(grade)
              })
              .catch(error => {
                // There was an error creating the grade
                res.status(500).send({
                  error,
                  msg: 'There was an error creating the grade'
                })
              })
          } else {
            // The student does not own the subject
            res.sendStatus(401)
          }
        })
        .catch(error => {
          // There was an error retrieving the subject for the grade
          res.status(500).send({
            error,
            msg: 'There was an error retrieving the subject for the grade'
          })
        })
    }
  })
}

// Fetch Grades by subject
exports.findAllBySubject = (req, res) => {
  jwt.verify(req.token, authentication.jwtSecret, (error, authData) => {
    if (error) {
      // Not authorized
      res.sendStatus(403)
    } else {
      Grades.findAll()
        .then(grades => {
          Subjects.findAll({
            where: {
              student_id: authData.id
            }
          })
            .then(subjects => {
              let gradesWithSubjectNames = []

              // Add subject name to each grade
              grades.forEach(grade => {
                subjects.forEach(subject => {
                  if (grade.subject_id === subject.id && subject.student_id === authData.id) {
                    let currentGrade = grade
                    currentGrade.dataValues.subject_name = subject.name
                    gradesWithSubjectNames.push(currentGrade)
                  }
                })

                return false
              })

              res.send(gradesWithSubjectNames)
            })
            .catch(error => {
              // There was an error retrieving the subject names for the grades
              res.status(500).send({
                error,
                msg: 'There was an error retrieving the subject names for the grades'
              })
            })
        })
        .catch(error => {
          // There was an error retrieving the grades
          res.status(500).send({
            error,
            msg: 'There was an error retrieving the grades'
          })
        })
    }
  })
}

// Find a grade by id
exports.findByPk = (req, res) => {
  jwt.verify(req.token, authentication.jwtSecret, (error, authData) => {
    if (error) {
      // Not authorized
      res.sendStatus(403)
    } else {
      Grades.findByPk(req.params.gradeId)
        .then(grade => {
          Subjects.findByPk(grade.subject_id)
            .then(subject => {
              if (subject.student_id === authData.id) {
                res.send(grade)
              } else {
                // The student does not own the subject
                res.sendStatus(401)
              }
            })
            .catch(error => {
              // There was an error retrieving the subject for the grade
              res.status(500).send({
                error,
                msg: 'There was an error retrieving the subject for the grade'
              })
            })
        })
        .catch(error => {
          // There was an error retrieving the grade
          res.status(500).send({
            error,
            msg: 'There was an error retrieving the grade'
          })
        })
    }
  })
}

// Update a grade
exports.update = (req, res) => {
  jwt.verify(req.token, authentication.jwtSecret, (error, authData) => {
    if (error) {
      // Not authorized
      res.sendStatus(403)
    } else {
      Subjects.findByPk(req.body.subjectId)
        .then(subject => {
          if (subject.student_id === authData.id) {
            Grades.update(
              {
                grade: req.body.grade,
                date: req.body.date,
                grade_type: req.body.gradeType,
                subject_id: subject.id
              },
              {
                where: { id: req.params.gradeId }
              }
            )
              .then(() => {
                // The request is accepted
                res.sendStatus(202)
              })
              .catch(error => {
                // There was an error updating the grade
                res.status(500).send({
                  error,
                  msg: 'There was an error updating the grade'
                })
              })
          } else {
            // The student does not own the subject
            req.send(401)
          }
        })
        .catch(error => {
          // There was an error retrieving the subject for the grade
          res.status(500).send({
            error,
            msg: 'There was an error retrieving the subject for the grade'
          })
        })
    }
  })
}

// Delete a grade by id
exports.delete = (req, res) => {
  jwt.verify(req.token, authentication.jwtSecret, (error, authData) => {
    if (error) {
      // Not authorized
      res.sendStatus(403)
    } else {
      Grades.findByPk(req.params.gradeId)
        .then(grade => {
          Subjects.findByPk(grade.subject_id)
            .then(subject => {
              if (subject.student_id === authData.id) {
                Grades.destroy({
                  where: { id: grade.id }
                })
                  .then(() => {
                    // The request is accepted
                    res.sendStatus(202)
                  })
                  .catch(error => {
                    // There was an error deleting the grade
                    res.status(500).send({
                      error,
                      msg: 'There was an error deleting the grade'
                    })
                  })
              }
            })
            .catch(error => {
              // There was an error retrieving the subject for the grade
              res.status(500).send({
                error,
                msg: 'There was an error retrieving the subject for the grade'
              })
            })
        })
        .catch(error => {
          // There was an error retrieving the grade
          res.status(500).send({
            error,
            msg: 'There was an error retrieving the grade'
          })
        })
    }
  })
}
