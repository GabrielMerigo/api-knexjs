const userModel = require('../models/User')
const passwordTokenController = require('../controllers/PasswordToken')

async function createUser(req, res) {
  const { email } = req.body

  if (email === undefined) {
    return res.status(400).json({ err: 'O email é inválido' })
  }

  const emailExists = await userModel.findEmail(email)

  if (emailExists) {
    return res.status(406).json({ err: 'This email exists' })
  }

  await userModel.create(req.body)
  return res.status(200).json({ status: 200 })
}

async function findAllUsers(req, res) {
  const users = await userModel.findAll()
  return res.status(200).json({ users })
}

async function findUserById(req, res) {
  const id = req.params.id
  const user = await userModel.findById(id)
  return res.status(200).json({ user })
}

async function editUser(req, res) {
  const { id, name, role, email } = req.body
  const result = await userModel.update(id, email, name, role)

  if (result !== undefined) {
    if (result.status) {
      res.status(200)
      res.send('tudo ok!')
    } else {
      res.status(406)
      res.send(result.error)
    }
  }
}

async function deleteUser(req, res) {
  const id = req.params.id
  const result = await userModel.deleteById(id)

  if (result.status) {
    res.status(200).send('user deleted')
  } else {
    res.status(406).json({ err: result.err })
  }
}

async function recoverPassword(req, res) {
  const email = req.body.email
  const result = await passwordTokenController.createToken(email)
  console.log(result)

  if (result.status) {
    res.status(200)
    res.send(result.token)
  } else {
    res.status(406)
    res.send(result.err)
  }
}

module.exports = {
  createUser,
  findAllUsers,
  findUserById,
  editUser,
  deleteUser,
  recoverPassword
}
