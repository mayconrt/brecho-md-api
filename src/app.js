const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const auth = require('./routes/auth')
const user = require('./routes/user')


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/auth', auth)
app.use('/user', user)

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

module.exports = app