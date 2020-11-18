const express = require('express')
const router = express.Router()
const auth = require('../controllers/user')
const authMiddleware = require('../middleware/auth')

router.use(authMiddleware)

router.get('/', auth.find)
router.get('/:userName', auth.findOne)
router.post('/', auth.create)
router.patch('/', auth.update)
router.delete('/:userName', auth.remove)

module.exports = router