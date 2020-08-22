const express = require('express')
const router = express.Router()
//const mysql = require('../mysql').pool
const multer = require('multer')
const produtosController = require('../controllers/produtos_controller')

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
router.get('/', produtosController.getProdutos)

//insere um produto
router.post('/', login.obrigatorio, upload.single('produto_image'), produtosController.postProdutos)

// retorna um produto especifico
router.get('/:id_produto', produtosController.getProdutosID)

//Atualiza um produto
router.patch('/', login.obrigatorio,produtosController.patchProdutos)

//Deleta um produto
router.delete('/:id_produto',login.obrigatorio, produtosController.deleteProdutos)

module.exports = router