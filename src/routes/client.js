const express = require('express')
const Multer = require('multer');
const router = express.Router()
const client = require('../controllers/client')
const authMiddleware = require('../middleware/auth')

//router.use(authMiddleware)

const multer = Multer({
    storage: Multer.memoryStorage(),
    limits: {
      fileSize: 5 * 1024 * 1024, // no larger than 5mb, you can change as needed.
    },
  });


router.get('/', client.find)
router.get('/:id', client.findOne)
router.post('/', client.create)
router.patch('/:clientId', client.update)
router.delete('/:clientId', client.remove)

module.exports = router