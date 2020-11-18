const connection = require('../database/connection')
const { httpMsg, erroMsg } = require('./util/constants')
const validate = require('./util/validate')
const query = require('./util/queryExecute')



async function find(request, response) {

    const result = await query.selectAll('employee')

    return response.status(result.code).json(result.data)
}

async function findOne(request, response) {
    const { id } = request.params

    const result = await query.selectOne('employee', id)

    return response.status(result.code).json(result.data)
}

async function create(request, response) {

    const result = await query.create('employee', request.body)

    return response.status(result.code).json(result.data)

}

async function update(request, response) {

    const { id } = request.params
    const result = await query.update('employee', request.body, id)

    return response.status(result.code).json(result.data)

}

async function remove(request, response) {

    try {
        const { id } = request.params

        const employee = await connection('employee')
            .where({ 'id': id })
            .delete()

        if (employee) {
            return response.status(200).json({
                data: { id: id },
                message: httpMsg.DELETED
            })
        } else {
            return response.status(404).json({ message: httpMsg.NOTFOUND })
        }

    } catch (error) {
        return response.status(500).json({ message: validate.getMessageError(error) })
    }


}

module.exports = {
    find,
    findOne,
    create,
    update,
    remove
}