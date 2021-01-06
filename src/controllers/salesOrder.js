const query = require('./util/queryExecute')
const connection = require('../database/connection')

const { httpMsg, resultNotFoud } = require('./util/constants')

const validate = require('./util/validate')

const productAPI = require('./product')

async function find(request, response) {

    const result = await query.selectAll('sales_order')

    return response.status(result.code).json(result.data)
}

async function findOne(request, response) {
    const { id } = request.params

    const result = await query.selectOne('sales_order', id)

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

    if (order.quantity && order.quantity < 1) {
        response.status(400).json({ data: [], message: httpMsg.QTDESMALLER })
    } {
        const product = await query.selectOne('product', order.idProduct)

        if (order.quantity > product.data.data.quantity) {
            response.status(400).json({ data: [], message: httpMsg.QTDEINDISPONIVEL })
        } else {

            const result = await query.create('sales_order', order)

            if (result.code == 200) {
                await productAPI.decrementQuantity(order.idProduct, order.quantity)
            }

            return response.status(result.code).json(result.data)

        }
    }

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

    if (order.quantity && order.quantity < 1) {
        response.status(400).json({ data: [], message: httpMsg.QTDESMALLER })
    } {

        const product = await query.selectOne('product', order.idProduct)

        if (order.quantity > product.data.data.quantity) {
            response.status(400).json({ data: [], message: httpMsg.QTDEINDISPONIVEL })
        } else {

            const result = await query.update('sales_order', order, orderId)

            return response.status(result.code).json(result.data)

        }

    }
}

async function remove(request, response) {

    const { orderId } = request.params
    const order = await query.selectOne('sales_order', orderId)

    const result = await query.remove('sales_order', orderId)

    if (result.code == 200)
        await productAPI.incrementQuantity(order.data.data.idProduct, order.data.data.quantity)

    return response.status(result.code).json(result.data)

}

async function selectOrders(request, response) {
    try {
        const result = await connection("sales_order")
            .join("client", "sales_order.idClient", "client.id")
            .join("product", "sales_order.idProduct", "product.id")
            .select("sales_order.*",
                "client.id as clientId",
                "client.name as clientName",
                "product.id as productId",
                "product.name as productName",
                "product.price as price"
            )

        if (result.length == 0) {
            response.status(404).json({ data: result, message: httpMsg.NOTFOUND })
        } else {
            response.status(200).json({ data: result, message: httpMsg.FOUND })
        }

    } catch (error) {
        response.status(500).json({ data: [], message: validate.getMessageError(error) })
    }
}

async function getSumary(request, response) {

    try {

        const [result] = await connection("sales_order")
            .sum({ totalSales: 'total_value' })
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
    selectOrders,
    getSumary
}