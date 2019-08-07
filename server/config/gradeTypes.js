const GradeTypes = require('../models/GradeTypes')

// Add grade types to database
module.exports = () => {
  // Orale
  GradeTypes.create({
    id: 1,
    name: 'Orale'
  })
    .then(gradeType => {
      console.log(`Grade type created: ${gradeType}.`)
    })
    .catch(error => {
      console.error(error)
    })

  // Scritto
  GradeTypes.create({
    id: 2,
    name: 'Scritto'
  })
    .then(gradeType => {
      console.log(`Grade type created: ${gradeType}.`)
    })
    .catch(error => {
      console.error(error)
    })

  // Pratico
  GradeTypes.create({
    id: 3,
    name: 'Pratico'
  })
    .then(gradeType => {
      console.log(`Grade type created: ${gradeType}.`)
    })
    .catch(error => {
      console.error(error)
    })
}
