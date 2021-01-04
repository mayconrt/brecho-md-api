const express = require('express')
const Multer = require('multer');
const router = express.Router()
const product = require('../controllers/product')
const authMiddleware = require('../middleware/auth')

//router.use(authMiddleware)

const multer = Multer({
    storage: Multer.memoryStorage(),
    limits: {
      fileSize: 5 * 1024 * 1024, // no larger than 5mb, you can change as needed.
    },
  });


router.get('/', product.find)
router.get('/sumary', product.getSumary)
router.get('/:id', product.findOne)
router.post('/', product.create)
router.patch('/:productId', product.update)
router.delete('/:productId', product.remove)

module.exports = router