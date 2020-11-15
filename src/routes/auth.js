const express = require('express')
const router = express.Router()

const auth = require('../controllers/auth')

router.get('/:userName/:password', auth.authorization)

module.exports = router