const Sequelize = require('sequelize')

const dbname = 'westudents'
const dbuser = 'westudents_user'
const dbpass = 'password_sicura'
const dbhost = 'localhost'

// Connect to mysql database
module.exports = new Sequelize(dbname, dbuser, dbpass, {
  host: dbhost,
  dialect: 'mysql'
})
