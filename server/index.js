const express = require('express')
const cors = require('cors')
const db = require('./config/mysql')

// Port
const port = process.env.PORT || 3000

// Populate default tables
const populateGenders = require('./config/genders')
const populateGradeTypes = require('./config/gradeTypes')
const populateNoteTypes = require('./config/noteTypes')
populateGenders()
populateGradeTypes()
populateNoteTypes()

// Test DB connection
db.authenticate()
  .then(() => console.info('Connected to database.'))
  .catch(error => console.error(error))

// App setup
const app = express()

// JSON parser
app.use(express.json())

// Use cors
app.use(cors())

// Routes
const students = require('./routes/api/students')
app.use('/api/students', students)

const subjects = require('./routes/api/subjects')
app.use('/api/subjects', subjects)

const notes = require('./routes/api/notes')
app.use('/api/notes', notes)

const grades = require('./routes/api/grades')
app.use('/api/grades', grades)

const gradeTypes = require('./routes/api/gradeTypes')
app.use('/api/gradeTypes', gradeTypes)

const noteTypes = require('./routes/api/noteTypes')
app.use('/api/noteTypes', noteTypes)

// Server
app.listen(port, () => console.log(`Listening on localhost:${port}.`))
