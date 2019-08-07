const Sequelize = require('sequelize')
const db = require('../config/mysql')

class GradeTypes extends Sequelize.Model {}

GradeTypes.init({
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
  timestamps: false,
  sequelize: db,
  modelName: 'GradeTypes',
  freezeTableName: true
})

module.exports = GradeTypes
