const knex = require('../database/connection')
const userModel = require('../models/User')
const { v4: uuid } = require('uuid')

async function createToken(email) {
  try {
    const user = await userModel.findByEmail(email)

    if (user !== undefined) {
      const token = uuid()

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

async function validateToken(token) {
  try {
    const result = await knex.select().where({ token }).table('passwordTokens')

    if (result.length > 0) {
      const tokenFromDB = result[0]

      if (tokenFromDB.used) {
        return { status: false }
      } else {
        return { status: true, token: tokenFromDB }
      }
    } else {
      return { status: false }
    }
  } catch (err) {
    console.log(err)
    return { status: false }
  }
}

async function setUsedToken(token) {
  await knex.update({ used: 1 }).where({ token }).table('passwordTokens')
}

module.exports = {
  createToken,
  validateToken,
  setUsedToken
}
