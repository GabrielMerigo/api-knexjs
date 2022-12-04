const knex = require('../database/connection')
const bcrypt = require('bcrypt')
const passwordTokenController = require('../controllers/PasswordToken')

async function create({ name, password, email }) {
  try {
    const hashPassword = await bcrypt.hash(password, 10)

    await knex
      .insert({ name, password: hashPassword, email, role: 0 })
      .table('users')
  } catch (error) {
    console.log(error)
  }
}

async function findEmail(email) {
  try {
    const result = await knex.select().where({ email }).table('users')
    return result.length > 0
  } catch (error) {
    console.log(error)
  }
}

async function findById(id) {
  try {
    const result = await knex
      .select(['id', 'name', 'email', 'role'])
      .where({ id })
      .table('users')
    return result[0]
  } catch (error) {
    console.log(error)
  }
}

async function findByEmail(email) {
  try {
    const result = await knex
      .select(['id', 'name', 'email', 'role'])
      .where({ email })
      .table('users')
    return result[0]
  } catch (error) {
    console.log(error)
  }
}

async function findAll() {
  try {
    const result = await knex
      .select(['id', 'name', 'email', 'role'])
      .table('users')
    return result
  } catch (error) {
    console.log(error)
    return []
  }
}

async function update(id, email, name, role) {
  const user = await findById(id)
  if (user !== undefined) {
    const editUser = {}

    if (email !== undefined) {
      if (email !== user.email) {
        const result = await findEmail(email)

        if (result === false) {
          editUser.email = email
        }
      } else {
        return {
          status: false,
          error: 'Já existe este email'
        }
      }
    }

    if (name !== undefined) {
      editUser.name = name
    }

    if (role !== undefined) {
      editUser.role = role
    }
    try {
      await knex.update(editUser).where({ id }).table('users')
      return {
        status: true
      }
    } catch (error) {
      return {
        status: false,
        error
      }
    }
  } else {
    return {
      status: false,
      error: 'o usuário não existe'
    }
  }
}

async function deleteById(id) {
  const user = await findById(id)
  try {
    if (user !== undefined) {
      await knex.delete(user).where({ id }).table('users')
      return {
        status: true
      }
    } else {
      return {
        status: false,
        err: 'usuário não existe portanto não pode ser deletado'
      }
    }
  } catch (err) {
    console.log(err)
  }
}

async function changePassword(newPassword, id, token) {
  const hashPassword = await bcrypt.hash(newPassword, 10)
  await knex.update({ password: hashPassword }).where({ id }).table('users')
  passwordTokenController.setUsedToken(token)
}

module.exports = {
  create,
  findEmail,
  findAll,
  findById,
  update,
  deleteById,
  findByEmail,
  changePassword
}
