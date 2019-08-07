const Genders = require('../models/Genders')

// Add genders to database
module.exports = () => {
  // Male
  Genders.create({
    id: 1,
    abbreviation: 'M'
  })
    .then(gender => {
      console.log(`Gender created: ${gender}.`)
    })
    .catch(error => {
      console.error(error)
    })

  // Female
  Genders.create({
    id: 2,
    abbreviation: 'F'
  })
    .then(gender => {
      console.log(`Gender created: ${gender}.`)
    })
    .catch(error => {
      console.error(error)
    })
}
