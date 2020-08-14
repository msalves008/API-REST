const express = require('express')
const app = express()
const morgan = require('morgan')

app.use(morgan('dev')) // monitora e exibe as requisições que estão sendo chamadas na aplicação

// produtos
const rotaProdutos = require('./routes/produtos')
/*o servidor recebe as requisições do tipo /produtos e procura o tipo 
da requisição (post, get, delete,...) dentro de rotas produtos */
app.use('/produtos', rotaProdutos) 

//pedidos
const rotaPedidos = require('./routes/pedidos')
app.use('/pedidos', rotaPedidos)

// rorta alternativa, caso a requisição chamada não seja nenhuma das anteriores 
app.use((req, res, next)=>{
    const erro = new Error('Não Encontrado');
    erro.status = 404
    next(erro)
})

app.use((error,req,res,next)=>{
    res.status(error.status || 500)
    return res.send({
        erro:{
            mensagem: error.message
        }
    })
})


module.exports = app