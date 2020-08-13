const express = require('express')
const router = express.Router()

router.get('/', (req, res, next)=>{
    res.status(200).send({
        mensagem: "dentro do GET da rota de produtos"
    })
})

router.post('/', (req, res, next)=>{
    res.status(200).send({
        mensagem: "usando POST dentro da rota de produtos"
    })
})




module.exports = router