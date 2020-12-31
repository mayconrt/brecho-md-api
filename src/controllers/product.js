const query = require('./util/queryExecute')
const connection = require('../database/connection')
const { httpMsg} = require('./util/constants')

const validate = require('./util/validate')

async function find(request, response) {
  
    const result = await query.selectAll('product')

    return response.status(result.code).json(result.data)
}

async function findOne(request, response) {
    const { id } = request.params

    const result = await query.selectOne('product', id)

    return response.status(result.code).json(result.data)
}

async function create(request, response) {
    const result = await query.create('product', request.body )

    return response.status(result.code).json(result.data)

}

async function update(request, response) {
    const {productId} = request.params
    const  {
        name,
        description,
        quantity,
        price
    } = request.body

    const product = {name, description, quantity,price}
    
    
    const result = await query.update('product', product, productId)
    
    return response.status(result.code).json(result.data)

}

async function remove(request, response) {

    const { productId } = request.params
    const result = await query.remove('product',  productId)

    return response.status(result.code).json(result.data)

}

async function incrementQuantity(idProduct, quantity) {

    try {
        const [quantityProduct] = await connection("product")
        .where({'id': parseInt(idProduct)})
        .select('quantity')
        
        const quantityUpdated = quantityProduct.quantity + quantity

        const result = await connection("product")
            .where({'id': idProduct})
            .update({quantity: quantityUpdated})

        if (result) {
            return { data: { data: { id: id }, message: httpMsg.UPDATED }, code: 200 }
        } else {
            return { data: { data: [], message: httpMsg.NOTPROCESS }, code: 500 }
        }

    } catch (error) {

        return { data: { data: [], message: validate.getMessageError(error) }, code: 500 }
    }

}

async function decrementQuantity(idProduct, quantity) {

    try {
        const [quantityProduct] = await connection("product")
        .where({'id': parseInt(idProduct)})
        .select('quantity')
        
        const quantityUpdated = quantityProduct.quantity - quantity

        const result = await connection("product")
            .where({'id': idProduct})
            .update({quantity: quantityUpdated})

        if (result) {
            return { data: { data: { id: id }, message: httpMsg.UPDATED }, code: 200 }
        } else {
            return { data: { data: [], message: httpMsg.NOTPROCESS }, code: 500 }
        }

    } catch (error) {

        return { data: { data: [], message: validate.getMessageError(error) }, code: 500 }
    }

}


module.exports = {
    find,
    findOne,
    create,
    update,
    remove,
    incrementQuantity,
    decrementQuantity,
}