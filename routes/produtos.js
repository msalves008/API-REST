const express = require('express')
const router = express.Router()
const mysql = require('../mysql').pool

// retorna todos os produtos 
router.get('/', (req, res, next) => { 
    mysql.getConnection((error, conn)=>{
        if(error) { return res.status(500).send({error: error})}
        conn.query(
            'SELECT * FROM PRODUTOS;',
            (error, resultado, fields) => {
                if(error) { return res.status(500).send({error: error})}
                return res.status(200).send({response: resultado})
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
            (error, resultado, field) => {
                conn.release()
                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: null
                    })
                }
                res.status(201).send({
                    mensagem: "PRODUTO INSERIDO COM SUCESSO",
                    id_produto: resultado.insertId
                })
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
            (error, resultado, fields) => {
                if(error) { return res.status(500).send({error: error})}
                return res.status(200).send({response: resultado})
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
            (error, resultado, field) => {
                conn.release()
                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: null
                    })
                }
                res.status(202).send({
                    mensagem: "PRODUTO ATUALIZADO COM SUCESSO"                    
                })
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
            (error, resultado, field) => {
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