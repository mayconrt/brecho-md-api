const query = require('./util/queryExecute')
const connection = require('../database/connection')

const { httpMsg, resultNotFoud } = require('./util/constants')

const validate = require('./util/validate')

const product = require('./product')

async function find(request, response) {

    const result = await query.selectAll('purchase_order')

    return response.status(result.code).json(result.data)
}

async function findOne(request, response) {
    const { id } = request.params

    const result = await query.selectOne('purchase_order', id)

    return response.status(result.code).json(result.data)
}

async function create(request, response) {
    const {
        idProduct,
        quantity,
        unit_value,
        discount_value,
        total_value
    } = request.body

    const purchaseOrder = {
        idProduct,
        quantity,
        unit_value,
        discount_value,
        total_value
    }

    const result = await query.create('purchase_order', purchaseOrder)
    
    if (result.code == 200)
        await product.incrementQuantity(purchaseOrder.idProduct, purchaseOrder.quantity)

    return response.status(result.code).json(result.data)

}

async function update(request, response) {
    const { purchaseOrderId } = request.params
    const {
        idProduct,
        quantity,
        unit_value,
        discount_value,
        total_value
    } = request.body

    const purchaseOrder = {
        idProduct,
        quantity,
        unit_value,
        discount_value,
        total_value
    }
    
    const result = await query.update('purchase_order', purchaseOrder, purchaseOrderId)

    return response.status(result.code).json(result.data)

}

async function remove(request, response) {

    const { purchaseOrderId } = request.params
    const result = await query.remove('purchase_order', purchaseOrderId)

    if (result.code == 200)
        await product.decrementQuantity(purchaseOrder.idProduct, purchaseOrder.quantity)

    return response.status(result.code).json(result.data)

}

async function selectOrders(request, response) {
    try {

        const result = await connection("purchase_order")
            .join("product", "purchase_order.idProduct", "product.id")
            .select("purchase_order.*", 
                    "product.id as productId", 
                    "product.name as productName",
                    "product.price as price")

        if (result.length == 0) {
            return resultNotFoud
        }
        response.status(200).json({ data: result, message: httpMsg.FOUND })

    } catch (error) {
        response.status(500).json({ data: [], message: validate.getMessageError(error) })
    }
}

async function getSumary(request, response) {
  
    try {

        const [result] = await connection("purchase_order")
            .sum({totalPurchase: 'total_value'})
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