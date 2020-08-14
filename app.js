const express = require('express')
const app = express()

// produtos
const rotaProdutos = require('./routes/produtos')
/*o servidor recebe as requisições do tipo /produtos e procura o tipo 
da requisição (post, get, delete,...) dentro de rotas produtos */
app.use('/produtos', rotaProdutos) 

//pedidos
const rotaPedidos = require('./routes/pedidos')
app.use('/pedidos', rotaPedidos)


module.exports = app