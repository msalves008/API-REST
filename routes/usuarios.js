const express = require('express')
const router = express.Router()

const controllerUsuario = require('../controllers/usuario_controller')


router.post('/cadastro', controllerUsuario.cadastrarUsuario)

router.post('/login', controllerUsuario.loginUsuario)

module.exports = router
