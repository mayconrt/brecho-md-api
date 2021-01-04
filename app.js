const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const allowCors = require('./src/middleware/cors')

const auth = require('./src/routes/auth')
const product = require('./src/routes/product')
const client = require('./src/routes/client')
const order = require('./src/routes/salesOrder')
const purchaseOrder = require('./src/routes/purchaseOrder')


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(allowCors)

app.use('/auth', auth)
app.use('/product', product)
app.use('/client', client)
app.use('/sales-order', order)
app.use('/purchase-order', purchaseOrder)

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