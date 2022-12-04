const express = require('express')
const router = express.Router()
const UserController = require('../controllers/UserController')

router.get('/users', UserController.findAllUsers)
router.get('/user/:id', UserController.findUserById)
router.post('/user', UserController.createUser)
router.put('/user', UserController.editUser)
router.delete('/user/:id', UserController.deleteUser)
router.post('/recoverpassword', UserController.recoverPassword)
router.post('/changepassword', UserController.changePassword)

module.exports = router
