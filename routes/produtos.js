const express = require('express')
const router = express.Router()

// retorna todos os produtos 
router.get('/', (req, res, next)=>{
    res.status(200).send({
        mensagem: "dentro do GET da rota de produtos"
    })
})

//insere um produto
router.post('/', (req, res, next)=>{
    res.status(200).send({
        mensagem: "usando POST dentro da rota de produtos"
    })
})

// retorna um produto especifico
router.get('/:id_produtos',(req, res,next)=>{
    const id = req.params.id_produtos

    if(id ==='especial'){
        res.status(200).send({
            mensagem: 'Você descubriu um ID Especial'
        })
    }else{
        res.status(200).send({
            mensagem: "buscando produt com Id",
            id: id
        })
    }    
})

//Atualiza um produto
router.patch('/:id_produtos', (req, res, next)=>{
    res.status(201).send({
        mensagem: "usando PATCH dentro da rota de produtos"
    })
})

//Deleta um produto
router.delete('/:id_produtos', (req, res, next)=>{
    const id = req.params.id_produtos
    res.status(201).send({
        mensagem: "usando DELETE dentro da rota de produtos",
        id : id 
    })
})








module.exports = router