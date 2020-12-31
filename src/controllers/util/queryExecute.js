const connection = require('../../database/connection')
const { httpMsg, 
        erroMsg,  
        resultNotFoud, 
        resultMadatory, 
        resultNotExists} = require('./constants')

const validate = require('./validate')

async function selectAll(table) {
    try {

        const result = await connection(table)
            .select('*')

        if (result.length == 0) {
            return resultNotFoud
        }

        return { data: { data: result, message: httpMsg.FOUND }, code: 200 }

    } catch (error) {
        return { data: { data: [], message: validate.getMessageError(error) }, code: 500 }
    }
}

async function selectOne(table, id) {

    try {

        const result = await connection(table)
            .where({ 'id': id })
            .select('*')

        if (result.length == 0) {
            return resultNotFoud
        }

        return { data: { data: result, message: httpMsg.FOUND }, code: 200 }

    } catch (error) {
        return { data: { data: [], message: validate.getMessageError(error) }, code: 500 }
    }
}

async function create(table, data) {
    try {

        if (!table)
            return resultNotExists

        if (!data)
            return resultMadatory

        const result = await connection(table).insert(data)

        if (result) {
            return { data: { data: { id: result.id }, message: httpMsg.CREATED }, code: 200 }
        } else {
            return { data: { data: [], message: httpMsg.NOTPROCESS }, code: 500 }
        }

    } catch (error) {
        return { data: { data: [], message: validate.getMessageError(error) }, code: 500 }
    }
}

async function update(table, data, id) {

    try {
        if (!table)
            return resultNotExists

        if (!data || !id)
            return resultMadatory

        const result = await connection(table)
            .where('id', id)
            .update(data)

        if (result) {
            return { data: { data: { id: id }, message: httpMsg.UPDATED }, code: 200 }
        } else {
            return { data: { data: [], message: httpMsg.NOTPROCESS }, code: 500 }
        }

    } catch (error) {

        return { data: { data: [], message: validate.getMessageError(error) }, code: 500 }
    }

}

async function remove(table, id) {

    try {
        if (!id)
            return { data: { data: [], message: erroMsg.MANDATORY }, code: 500 }

        const result = await connection(table)
            .where({ 'id': id })
            .delete()

        if (result) {
            return { data: { data: { id: id }, message: httpMsg.DELETED }, code: 200 }
        } else {
            return resultNotFoud
        }

    } catch (error) {
        return { data: { data: [], message: validate.getMessageError(error) }, code: 500 }
    }


}

module.exports = {
    selectAll,
    selectOne,
    create,
    update,
    remove
}