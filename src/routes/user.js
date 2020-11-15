const express = require('express')
const router = express.Router()
const auth = require('../controllers/user')
const authMiddleware = require('../middleware/auth')

router.use(authMiddleware)

router.get('/', auth.find)
router.get('/:userName', auth.findOne)
router.post('/', auth.create)
router.patch('/:userName', auth.update)
router.delete('/:userName', auth.delete)

module.exports = router