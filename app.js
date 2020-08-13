const express = require('express')
const app = express()

const rotaProdutos = require('./routes/produtos')

/*o servidor recebe as requisições do tipo /produtos e procura o tipo 
da requisição (post, get, delete,...) dentro de rotas produtos */
app.use('/produtos', rotaProdutos) 




module.exports = app