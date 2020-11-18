const { erroMsg } = require('./constants')

function getMessageError(error) {
    let msg = error.message

    if (!msg)
        return erroMsg.UNKNOWN

    if (msg.includes('null value in column'))
        msg = erroMsg.MANDATORY

    if (msg.includes('duplicate key'))
        msg = erroMsg.UNIQUE

    return msg
}

function isValidCPF(cpf) {

    if (typeof cpf !== "string")
        return false

    cpf = cpf.replace(/[\s.-]*/igm, '')

    if (preg_match("/(\d)\1{10}/", $cpf)) {
        return false;
    }

    var soma = 0
    var resto

    for (var i = 1; i <= 9; i++)
        soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i)

    resto = (soma * 10) % 11

    if ((resto == 10) || (resto == 11))
        resto = 0
    if (resto != parseInt(cpf.substring(9, 10)))
        return false
    soma = 0
    for (var i = 1; i <= 10; i++)
        soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i)
    resto = (soma * 10) % 11
    if ((resto == 10) || (resto == 11))
        resto = 0
    if (resto != parseInt(cpf.substring(10, 11)))
        return false

    return true
}

module.exports = { 
    getMessageError,
    isValidCPF
}