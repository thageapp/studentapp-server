const Sequelize = require('sequelize')
const db = require('../config/mysql')

const Subjects = require('./Subjects')
const GradeTypes = require('./GradeTypes')

class Grades extends Sequelize.Model {}

Grades.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  grade: {
    type: Sequelize.FLOAT,
    allowNull: false,
    validate: {
      isNumeric: true,
      min: 0,
      max: 10
    }
  },
  date: {
    type: Sequelize.DATE,
    allowNull: false
  },
  grade_type: {
    type: Sequelize.INTEGER,
    references: {
      model: GradeTypes,
      key: 'id'
    }
  },
  subject_id: {
    type: Sequelize.INTEGER,
    references: {
      model: Subjects,
      key: 'id'
    }
  }
}, {
  sequelize: db,
  modelName: 'Grades',
  timestamps: false,
  freezeTableName: true
})

module.exports = Grades
