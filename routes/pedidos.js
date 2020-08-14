const express = require('express')
const router = express.Router()

// retorna todos os pedidos 
router.get('/', (req, res, next)=>{
    res.status(200).send({
        mensagem: "dentro do GET da rota de pedidos"
    })
})

//insere um pedido
router.post('/', (req, res, next)=>{
    res.status(200).send({
        mensagem: "usando POST dentro da rota de pedidos"
    })
})

// retorna um pedido especifico
router.get('/:id_pedidos',(req, res,next)=>{
    const id = req.params.id_pedidos

    if(id ==='especial'){
        res.status(200).send({
            mensagem: 'Você descubriu um ID Especial'
        })
    }else{
        res.status(200).send({
            mensagem: "buscando pedidos com Id",
            id: id
        })
    }    
})

//Atualiza um pedido
router.patch('/:id_pedidos', (req, res, next)=>{
    res.status(201).send({
        mensagem: "usando PATCH dentro da rota de pedidos"
    })
})

//Deleta um pedido
router.delete('/:id_pedidos', (req, res, next)=>{
    const id = req.params.id_pedidos
    res.status(201).send({
        mensagem: "usando DELETE dentro da rota de pedidos",
        id : id 
    })
})








module.exports = router