const express = require('express')
const router = express.Router()
const mysql = require('../mysql').pool

// retorna todos os pedidos 
router.get('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            `SELECT pedidos.id_pedido,
                pedidos.quantidade,
                produtos.id_produto,
                produtos.nome,
                produtos.preco
                FROM pedidos INNER JOIN produtos ON produtos.id_produto = pedidos.id_produto;`,
            (error, result, fields) => {
                if (error) { return res.status(500).send({ error: error }) }
                const response = {
                    //quantidade: result.length,
                    pedidos: result.map(pedido => {
                        return {
                            id_pedido: pedido.id_pedido,
                            quantidade: pedido.quantidade,
                            produto:{
                                id_produto: pedido.id_produto,
                                nome: pedido.nome,
                                preco: pedido.preco
                            },                        

                            
                            requst: {
                                tipo: 'GET',
                                descricao: 'Retorna todos os pedidos',
                                url: 'http:localhost:3000/produtos/' + pedido.id_produto
                            }
                        }
                    })
                }
                return res.status(200).send({ response })
            }
        )
    })
})

//insere um pedido
router.post('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query('SELECT * FROM produtos WHERE id_produto = ?',
            [req.body.id_produto],
            (error, result, field) => {
               // conn.release()
                if (error) { return res.status(500).send({ error: error }) }
                if (result.length == 0) {
                    //conn.end()                    
                    return res.status(404).send({
                        mensagem: 'PRODUTO NÃO ENCONTRADO'
                    })                   
                }

            })
    })
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'INSERT INTO pedidos (id_produto, quantidade) VALUES (?,?)',
            [req.body.id_produto, req.body.quantidade],
            (error, result, field) => {
                conn.release()
                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: null
                    })
                }
                const response = {
                    mensagem: 'PEDIDO INSERIDO COM SUCESSO',
                    pedidoCriado: {
                        id_pedido: result.id_pedido,
                        id_produto: req.body.id_produto,
                        quantidade: req.body.quantidade,

                        requst: {
                            tipo: 'POST',
                            descricao: 'RETORNA TODOS OS PEDIDOS',
                            url: 'http:localhost:3000/pedidos'
                        }
                    }
                }
                res.status(201).send(response)
            }
        )
    })
})

// retorna um pedido especifico
router.get('/:id_pedido', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM pedidos WHERE id_pedido = ?;',
            [req.params.id_pedido],
            (error, result, fields) => {
                if (error) { return res.status(500).send({ error: error }) }
                if (result.length == 0) {
                    return res.status(404).send({
                        mensagem: 'NÃO FOI ENCONTRADO PEDIDO COM ESTE ID'
                    })
                }
                const response = {
                    pedido: {
                        id_pedido: result[0].id_pedido,
                        id_produto: result[0].id_produto,
                        quantidade: result[0].quantidade,

                        requst: {
                            tipo: 'GET',
                            descricao: 'RETORNA UM PEDIDO',
                            url: 'http:localhost:3000/pedidos'
                        }
                    }
                }
                return res.status(200).send(response)
            }
        )
    })
})

//Atualiza um pedido
router.patch('/:id_pedido', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            `UPDATE pedidos SET id_produto = ?, quantidade = ? WHERE id_pedido = ?`,
            [req.body.id_produto, req.body.quantidade, req.body.id_pedido],
            (error, result, field) => {
                conn.release()
                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: null
                    })
                }
                const response = {
                    mensagem: 'PEDIDO ATUALIZADO COM SUCESSO',
                    pedidoAtualizado: {
                        id_pedido: req.body.id_pedido,
                        id_produto: req.body.id_produto,
                        quantidade: req.body.quantidade,
                        requst: {
                            tipo: 'POST',
                            descricao: 'ATUALIZA UM PEDIDO',
                            url: 'http:localhost:3000/pedidos/' + req.params.id_pedido
                        }
                    }
                }
                res.status(202).send(response)
            }
        )
    })
})

//Deleta um pedido
router.delete('/:id_pedido', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            `DELETE FROM pedidos WHERE id_pedido = ?`,
            [req.params.id_pedido],
            (error, result, field) => {
                conn.release()
                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: null
                    })
                }
                res.status(200).send({
                    mensagem: "PEDIDO REMOVIDO COM SUCESSO"
                })
            }
        )
    })
})








module.exports = router