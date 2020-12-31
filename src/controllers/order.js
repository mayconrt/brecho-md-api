const query = require('./util/queryExecute')
const connection = require('../database/connection')

const { httpMsg, resultNotFoud } = require('./util/constants')

const validate = require('./util/validate')

const product = require('./product')

async function find(request, response) {

    const result = await query.selectAll('order')

    return response.status(result.code).json(result.data)
}

async function findOne(request, response) {
    const { id } = request.params

    const result = await query.selectOne('order', id)

    return response.status(result.code).json(result.data)
}

async function create(request, response) {
    const {
        idProduct,
        idClient,
        quantity,
        unit_value,
        discount_value,
        total_value
    } = request.body

    const order = {
        idProduct,
        idClient,
        quantity,
        unit_value,
        discount_value,
        total_value
    }

    const result = await query.create('order', order)
    
    if (result.code == 200)
        await product.decrementQuantity(order.idProduct, order.quantity)

    return response.status(result.code).json(result.data)

}

async function update(request, response) {
    const { orderId } = request.params
    const {
        idProduct,
        idClient,
        quantity,
        unit_value,
        discount_value,
        total_value
    } = request.body

    const order = {
        idProduct,
        idClient,
        quantity,
        unit_value,
        discount_value,
        total_value
    }
    
    const result = await query.update('order', order, orderId)

    return response.status(result.code).json(result.data)

}

async function remove(request, response) {

    const { orderId } = request.params
    const result = await query.remove('order', orderId)

    if (result.code == 200)
        await product.incrementQuantity(order.idProduct, order.quantity)

    return response.status(result.code).json(result.data)

}

async function selectOrders(request, response) {
    try {

        const result = await connection("order")
            .join("client", "order.idClient", "client.id")
            .join("product", "order.idProduct", "product.id")
            .select("order.*", 
                    "client.id as clientId", 
                    "client.name as clientName",                     
                    "product.id as productId",
                    "product.name as productName",
                    "product.price as price"
                    )

        if (result.length == 0) {
            return resultNotFoud
        }
        response.status(200).json({ data: result, message: httpMsg.FOUND })

    } catch (error) {
        response.status(500).json({ data: [], message: validate.getMessageError(error) })
    }
}


module.exports = {
    find,
    findOne,
    create,
    update,
    remove,
    selectOrders
}