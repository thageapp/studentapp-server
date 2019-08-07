const Sequelize = require('sequelize')
const db = require('../config/mysql')

const Genders = require('./Genders')

class Students extends Sequelize.Model {}

Students.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isAlphanumeric: true
    }
  },
  surname: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isAlphanumeric: true
    }
  },
  birth_date: {
    type: Sequelize.DATE,
    allowNull: false
  },
  gender: {
    type: Sequelize.INTEGER,
    references: {
      model: Genders,
      key: 'id'
    },
    validate: {
      len: [1, 1],
      min: 1,
      max: 2
    }
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  phone_number: {
    type: Sequelize.BIGINT,
    validate: {
      len: [9, 11]
    },
    allowNull: false
  },
  class_name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password_hash: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  modelName: 'Students',
  sequelize: db,
  timestamps: false,
  freezeTableName: true
})

module.exports = Students
