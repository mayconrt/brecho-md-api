const jwt = require('jsonwebtoken')
const authConfig = require('../resources/credentials/auth/auth.json')

module.exports = (request, response, next) => {
    try {
        const authHeader = request.headers.authorization

        console.log(authHeader)

        if (!authHeader)
            return response.status(401).send({ error: 'No token provided' })

        const parts = authHeader.split(' ')

        if (!parts.length === 2)
            return response.status(401).send({ error: 'Token error' })

        const [token] = parts

        jwt.verify(token, authConfig.secret, (err, decoded) => {
            if (err) return response.status(401).send({ error: 'Token invalid' })

            response.userName = decoded.userName
            return next()
        })
    } catch (error) {
        return response.status(401).send({ error: 'Authentication failed' })
    }



}