const express = require('express')
const router = express.Router()
const employee = require('../controllers/employee')
const authMiddleware = require('../middleware/auth')

router.use(authMiddleware)

router.get('/', employee.find)
router.get('/:id', employee.findOne)
router.post('/', employee.create)
router.patch('/:id', employee.update)
router.delete('/:id', employee.remove)

module.exports = router