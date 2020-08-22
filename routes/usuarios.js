const express = require('express')
const router = express.Router()
const mysql = require('../mysql').pool
const bcrypt = require('bcrypt')
//const { response } = require('../app')

router.post('/cadastro',(req,res, next)=>{
    mysql.getConnection((error, conn) => {
        // verifica se já existe o email no banco de dados
        conn.query('SELECT * FROM  usuarios WHERE email =?',[req.body.email],(error,results)=>{
            if (error) { return res.status(500).send({ error: error }) }
            if(results.length> 0){
                res.status(409).send({
                    mensagem: 'Usuário já cadastrado'
                })
            } else{
                if (error) { return res.status(500).send({ error: error }) }
                bcrypt.hash(req.body.senha, 10 ,(errBcrypt, hash)=>{// gera um hash da senha do usuario de 10 caracteres 
                    if (errBcrypt){
                        return res.status(500).send({error: errBcrypt})
                    }
                    conn.query(
                        `INSERT INTO usuarios (email, senha) VALUES (?,?)`,
                        [ req.body.email,hash],
                        (error, results)=>{
                            conn.release()
                            if (error) { 
                                return res.status(500).send({ error: error }) 
                            }
                           const response = {
                                mensagem: 'Usuário criado com sucesso',
                                usuarioCriado: {
                                    id_usuario: results.insertId,
                                    email: req.body.email
                                }
                            }
                            return res.status(201).send(response)
                        }
                        )
                })
            }
        })
       
    })
})

router.post('/login',(req, res,next)=>{
    mysql.getConnection((error,conn)=>{
        if(error){ return res.status(500).send({error:error})}
        const query = `SELECT * FROM usuarios WHERE email = ?`
        conn.query(query,[req.body.email],(error,results,fields)=>{
            conn.release()
            if(error){ return res.status(500).send({error:error})}
            if (results.length<1){
                return res.status(401).send({mensagem: 'Falha na autenticação'})
            }
            // comparar senha digitata com senha hash armazenada no banco
            bcrypt.compare(req.body.senha, results[0].senha, (err, result)=>{
                if(err){
                    return res.status(401).send({mensagem: 'Falha na autenticação'})
                }
                if(result){
                    return res.status(200).send({
                        mensagem: 'autenticado com sucesso'
                    })
                }
                return res.status(401).send({mensagem: 'E-mail ou senha Incorreto'})
            })
        })
    })
})





module.exports = router
