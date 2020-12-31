const query = require('./util/queryExecute')

async function find(request, response) {
  
    const result = await query.selectAll('client')

    return response.status(result.code).json(result.data)
}

async function findOne(request, response) {
    const { id } = request.params

    const result = await query.selectOne('client', id)

    return response.status(result.code).json(result.data)
}

async function create(request, response) {  
    const result = await query.create('client', request.body )

    return response.status(result.code).json(result.data)

}

async function update(request, response) {
    const {clientId} = request.params
    const  {
        name,
        email,
        celphone,
        telphone
    } = request.body

    const client = {name, email, celphone,telphone}
    
    const result = await query.update('client', client, clientId)
    
    return response.status(result.code).json(result.data)

}

async function remove(request, response) {

    const { clientId } = request.params
    const result = await query.remove('client',  clientId)

    return response.status(result.code).json(result.data)

}


module.exports = {
    find,
    findOne,
    create,
    update,
    remove
}