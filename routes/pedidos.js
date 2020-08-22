const express = require('express')
const router = express.Router()
const mysql = require('../mysql').pool
const pedidosController = require('../controllers/pedidos_controller')
// retorna todos os pedidos 


router.get('/', pedidosController.getPedidos )

//insere um pedido
router.post('/',pedidosController.postPedidos )

// retorna um pedido especifico
router.get('/:id_pedido',pedidosController.getPedidosId )

//Atualiza um pedido
router.patch('/:id_pedido', pedidosController.patchPedidos)

//Deleta um pedido
router.delete('/:id_pedido', pedidosController.deletePedidos)








module.exports = router