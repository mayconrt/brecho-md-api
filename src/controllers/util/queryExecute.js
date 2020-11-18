const connection = require('../../database/connection')
const { httpMsg, erroMsg } = require('./constants')
const validate = require('./validate')

const resultNotFoud = { data: { data: [], message: httpMsg.NOTFOUND }, code: 404 }
const resultMadatory = { data: { data: [], message: erroMsg.MANDATORY }, code: 500 }
const resultNotExists = { data: { data: [], message: erroMsg.TABLENOT }, code: 500 }

async function selectAll(table) {
    try {

        const employee = await connection(table)
            .select('*')

        if (!employee) {
            return resultNotFoud
        }

        return { data: { data: employee, message: httpMsg.FOUND }, code: 200 }

    } catch (error) {
        return { data: { data: [], message: validate.getMessageError(error) }, code: 500 }
    }
}

async function selectOne(table, id) {

    try {
        const employee = await connection(table)
            .where({ 'id': id })
            .select('*')

        if (!employee) {
            return resultNotFoud
        }

        return { data: { data: employee, message: httpMsg.FOUND }, code: 200 }

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

        const [employee] = await connection(table).insert(data).returning('id')

        if (employee) {
            return { data: { data: { id: employee }, message: httpMsg.CREATED }, code: 200 }
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

        const employee = await connection(table).where('id', id)
            .update(data)

        if (employee) {
            return { data: { data: { id: id }, message: httpMsg.UPDATED }, code: 200 }
        } else {
            return resultNotFoud
        }

    } catch (error) {
        return { data: { data: [], message: validate.getMessageError(error) }, code: 500 }
    }

}

async function remove(table, id) {

    try {

        if (!id)
            return { data: { data: [], message: erroMsg.MANDATORY }, code: 500 }

        const employee = await connection(table)
            .where({ 'id': id })
            .delete()

        if (employee) {
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