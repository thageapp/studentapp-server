const Sequelize = require('sequelize')
const db = require('../config/mysql')

const Students = require('./Students')
const NoteTypes = require('./NoteTypes')

class Notes extends Sequelize.Model {}

Notes.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  note: {
    type: Sequelize.STRING,
    allowNull: false
  },
  date: {
    type: Sequelize.DATE,
    allowNull: true
  },
  note_type: {
    type: Sequelize.INTEGER,
    references: {
      model: NoteTypes,
      key: 'id'
    }
  },
  student_id: {
    type: Sequelize.INTEGER,
    references: {
      model: Students,
      key: 'id'
    }
  }
}, {
  modelName: 'Notes',
  sequelize: db,
  timestamps: false,
  freezeTableName: true
})

module.exports = Notes
