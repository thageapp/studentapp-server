const Sequelize = require('sequelize')
const db = require('../config/mysql')

const Students = require('./Students')

class Subjects extends Sequelize.Model {}

Subjects.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  student_id: {
    type: Sequelize.INTEGER,
    references: {
      model: Students,
      key: 'id'
    }
  }
}, {
  timestamps: false,
  belongsTo: Students,
  sequelize: db,
  freezeTableName: true
})

module.exports = Subjects
