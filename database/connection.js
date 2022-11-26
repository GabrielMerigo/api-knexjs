var knex = require('knex')({
  client: 'mysql',
  connection: {
    host: 'localhost',
    user: 'root',
    password: 'gabriel123',
    database: 'apiusers'
  }
})

module.exports = knex
