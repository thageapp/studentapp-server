const Sequelize = require('sequelize')
const db = require('../config/mysql')

const Students = require('./Students')

class Genders extends Sequelize.Model {}

Genders.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  abbreviation: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  sequelize: db,
  modelName: 'Genders',
  timestamps: false,
  freezeTableName: true
})

Genders.belongsTo(Students, {
  foreignKey: 'gender'
})

module.exports = Genders
