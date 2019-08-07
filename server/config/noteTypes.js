const NoteTypes = require('../models/NoteTypes')

// Add note types to database
module.exports = () => {
  // Compito per casa
  NoteTypes.create({
    id: 1,
    name: 'Compito per casa'
  })
    .then(noteType => {
      console.log(`Note type created: ${noteType}.`)
    })
    .catch(error => {
      console.error(error)
    })

  // Compito scritto
  NoteTypes.create({
    id: 2,
    name: 'Compito scritto'
  })
    .then(noteType => {
      console.log(`Note type created: ${noteType}.`)
    })
    .catch(error => {
      console.error(error)
    })

  // Interrogazione
  NoteTypes.create({
    id: 3,
    name: 'Interrogazione'
  })
    .then(noteType => {
      console.log(`Note type created: ${noteType}.`)
    })
    .catch(error => {
      console.error(error)
    })

  // Avviso
  NoteTypes.create({
    id: 4,
    name: 'Avviso'
  })
    .then(noteType => {
      console.log(`Note type created: ${noteType}.`)
    })
    .catch(error => {
      console.error(error)
    })
}
