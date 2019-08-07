const Sequelize = require('sequelize')
const db = require('../config/mysql')

class NoteTypes extends Sequelize.Model {}

NoteTypes.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  modelName: 'NoteTypes',
  sequelize: db,
  timestamps: false,
  freezeTableName: true
})

module.exports = NoteTypes
