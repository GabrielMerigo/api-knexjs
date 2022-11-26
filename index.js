const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const usersRoutes = require('./routes/users.routes')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/', usersRoutes)

app.listen(8686, () => {
  console.log('Servidor rodando')
})
