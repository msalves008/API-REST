const express = require('express')
const router = express.Router()
const mysql = require('../mysql').pool

// retorna todos os produtos 
router.get('/', (req, res, next) => { 
    mysql.getConnection((error, conn)=>{
        if(error) { return res.status(500).send({error: error})}
        conn.query(
            'SELECT * FROM PRODUTOS;',
            (error, result, fields) => {
                if(error) { return res.status(500).send({error: error})}
                const response = {
                    quantidade: result.length,
                    produtos: result.map(prod=>{
                        return{
                            id_produto: prod.id_produto,
                            nome: prod.nome,
                            preco: prod.preco,
                            requst: {
                                tipo: 'GET',
                                descricao:'Retorna todos os produtos',
                                url: 'http:localhost:3000/produtos/'+ prod.id_produto
                            }
                        }
                    })
                }
                return res.status(200).send({response})
            }
        )
    })
})

//insere um produto
router.post('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error) { return res.status(500).send({error: error})}
        conn.query(
            'INSERT INTO produtos (nome, preco) VALUES (?,?)',
            [req.body.nome, req.body.preco],
            (error, result, field) => {
                conn.release()
                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: null
                    })
                }
                const response ={
                    mensagem : 'PRODUTO INSERIDO COM SUCESSO',
                    produtoCriado: {
                        id_produto: result.id_produto,
                        nome: req.body.nome,
                        preco: req.body.preco,
                        requst: {
                            tipo: 'POST',
                            descricao:'INSERE UM PRODUTO',
                            url: 'http:localhost:3000/produtos'
                        }
                    }
                }
                res.status(201).send(response)
            }
        )
    })
})

// retorna um produto especifico
router.get('/:id_produto', (req, res, next) => {
    mysql.getConnection((error, conn)=>{
        if(error) { return res.status(500).send({error: error})}
        conn.query(
            'SELECT * FROM PRODUTOS WHERE id_produto = ?;',
            [req.params.id_produto],
            (error, result, fields) => {
                if(error) { return res.status(500).send({error: error})}
                if(result.length == 0){
                    return res.status(404).send({
                        mensagem: 'NÃO FOI ENCONTRADO PRODUTO COM ESTE ID'
                    })
                }
                const response ={                   
                    produto: {
                        id_produto: result[0].id_produto,
                        nome: result[0].nome,
                        preco: result[0].preco,
                        requst: {
                            tipo: 'GET',
                            descricao:'RETORNA UM PRODUTO',
                            url: 'http:localhost:3000/produtos'
                        }
                    }
                }
                return res.status(200).send(response)
            }
        )
    })
})

//Atualiza um produto
router.patch('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error) { return res.status(500).send({error: error})}
        conn.query(
            `UPDATE produtos SET nome = ?, preco = ? WHERE id_produto = ?`,
            [req.body.nome, req.body.preco, req.body.id_produto],
            (error, result, field) => {
                conn.release()
                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: null
                    })
                }
                const response ={
                    mensagem : 'PRODUTO ATUALIZADO COM SUCESSO',
                    produtoAtualizado: {
                        id_produto: req.body.id_produto,
                        nome: req.body.nome,
                        preco: req.body.preco,
                        requst: {
                            tipo: 'POST',
                            descricao:'ATUALIZA UM PRODUTO',
                            url: 'http:localhost:3000/produtos' + req.body.id_produto
                        }
                    }
                }
                res.status(202).send(response)
            }
        )
    })
})

//Deleta um produto
router.delete('/:id_produto', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error) { return res.status(500).send({error: error})}
        conn.query(
            `DELETE FROM produtos WHERE id_produto = ?`,
            [req.params.id_produto],
            (error, result, field) => {
                conn.release()
                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: null
                    })
                }               
                res.status(200).send({
                    mensagem: "PRODUTO REMOVIDO COM SUCESSO"                    
                })
            }
        )
    })
})








module.exports = router