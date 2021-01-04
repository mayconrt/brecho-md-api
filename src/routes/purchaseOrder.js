const express = require('express')
const Multer = require('multer');
const router = express.Router()
const purchaseOrder = require('../controllers/purchaseOrder')
const authMiddleware = require('../middleware/auth')

//router.use(authMiddleware)

const multer = Multer({
    storage: Multer.memoryStorage(),
    limits: {
      fileSize: 5 * 1024 * 1024, // no larger than 5mb, you can change as needed.
    },
  });


router.get('/', purchaseOrder.find)
router.get('/all', purchaseOrder.selectOrders)
router.get('/sumary', purchaseOrder.getSumary)
router.get('/:id', purchaseOrder.findOne)
router.post('/', purchaseOrder.create)
router.patch('/:purchaseOrderId', purchaseOrder.update)
router.delete('/:purchaseOrderId', purchaseOrder.remove)

module.exports = router