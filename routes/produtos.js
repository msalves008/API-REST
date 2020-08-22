const express = require('express')
const router = express.Router()
const mysql = require('../mysql').pool
const multer = require('multer')

// constante login é responsavel por passar o token de autenticação pra dentro da api
const login = require('../middleware/login') 

const storage =  multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, './uploads/')
    },
    filename: function (req, file, cb){
        let data = new Date().toISOString().replace(/:/g, '-') + '-';
        cb(null, data + file.originalname );
    }
})
const fileFilter =  (req, file,cb)=>{ // definindo os tipos de imagem aceitos (PNG e JPEG)
    if(file.mimetype ==='image/jpeg' || file.mimetype ==='image/png'){
        cb(null,true)
    }else{
        cb(null, false)
    }
}
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024*1024*5
    },
    fileFilter: fileFilter 

})

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
                            imagem_produto: prod.imagem_produto,
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
router.post('/', login.obrigatorio, upload.single('produto_image'), (req, res, next) => {
    console.log(req.file)
    mysql.getConnection((error, conn) => {
        if(error) { return res.status(500).send({error: error})}
        conn.query(
            'INSERT INTO produtos (nome, preco, imagem_produto) VALUES (?,?,?)',
            [req.body.nome, req.body.preco, req.file.path],
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
                        imagem_produto: req.file.path.replace(/\\/g, '/'),
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
                        imagem_produto: result[0].imagem_produto,
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