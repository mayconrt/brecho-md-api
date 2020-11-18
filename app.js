const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const auth = require('./src/routes/auth')
const user = require('./src/routes/user')
const address = require('./src/routes/address')
const employee = require('./src/routes/employee')
const payslip = require('./src/routes/payslip')
const paytype = require('./src/routes/paytype')
const position = require('./src/routes/position')
const vacation = require('./src/routes/vacation')
const vacationstatus = require('./src/routes/vacationstatus')


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/auth', auth)
app.use('/user', user)
app.use('/address', address)
app.use('/employee', employee)
app.use('/payslip', payslip)
app.use('/paytype', paytype)
app.use('/position', position)
app.use('/vacation', vacation)
app.use('/vacationstatus', vacationstatus)

app.use((req, res, next) => {
    const erro = new Error('Not Found')
    erro.status = 404
    next(erro)
})

app.use((error, req, res, next) => {
    res.status(error.status || 500)

    return res.send({
        erro: {
            mensagem: error.message
        }
    })
})

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
// [END gae_node_request_example]

module.exports = app