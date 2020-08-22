const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')


// produtos
const rotaProdutos = require('./routes/produtos')
//pedidos
const rotaPedidos = require('./routes/pedidos')

app.use(morgan('dev')) // monitora e exibe as requisições que estão sendo chamadas na aplicação
app.use('/uploads', express.static('uploads'));// deixa o diretorio de uploads disponivel publicamente
app.use(bodyParser.urlencoded({extended: false})) // apenas dados simples
app.use(bodyParser.json()) // definindo Json como valor unico de entrada
app.use((req, res, next)=>{
    res.header('Access-Control-Allow-Origin', '*') //liberando o acesso da APi Para todos os servidores, caso queira limitaro acesso ha um servidor especifico subistitua * pelo link do servidor EX: http:Servidor.com.br
    
    //limitando o tipo de cabeçario aceito pela APi 
    res.header('Access-Control-Allow-Header',
        'Origin, X-Requrested-With, Content-Type, Accept, Authorization'); 
    
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
        return res.status(200).send({})
    }
    next()
})



/*o servidor recebe as requisições do tipo /produtos e procura o tipo 
da requisição (post, get, delete,...) dentro de rotas produtos */
app.use('/produtos', rotaProdutos) 

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