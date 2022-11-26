const knex = require('../database/connection')
const userModel = require('../models/User')
const { v4: uuid } = require('uuid')

async function createToken(email) {
  try {
    const user = await userModel.findByEmail(email)

    if (user !== undefined) {
      const token = uuid()
      console.log(user)

      await knex
        .insert({ user_id: user.id, used: 0, token })
        .table('passwordTokens')

      return {
        status: true,
        token
      }
    } else {
      return {
        status: false,
        err: 'O e-mail passado não existe no banco de dados.'
      }
    }
  } catch (err) {
    return { status: false, error: err }
  }
}

module.exports = {
  createToken
}
