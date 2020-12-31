const express = require('express')
const Multer = require('multer');
const router = express.Router()
const order = require('../controllers/order')
const authMiddleware = require('../middleware/auth')

//router.use(authMiddleware)

const multer = Multer({
    storage: Multer.memoryStorage(),
    limits: {
      fileSize: 5 * 1024 * 1024, // no larger than 5mb, you can change as needed.
    },
  });


router.get('/', order.find)
router.get('/all', order.selectOrders)
router.get('/:id', order.findOne)
router.post('/', order.create)
router.patch('/:orderId', order.update)
router.delete('/:orderId', order.remove)

module.exports = router