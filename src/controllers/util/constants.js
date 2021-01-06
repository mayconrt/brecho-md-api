const httpMsg = {
    NOTFOUND: "Registro não encontrado.",
    FOUND: "Registro encontrado com sucesso.",
    CREATED: "Registro criado com sucesso.",
    UPDATED: "Registro atualizado com sucesso.",
    DELETED: "Registro excluído com sucesso.",
    NOTPROCESS: "Record not processed",
    QTDEINDISPONIVEL: "Quantidade do produto insuficiente para realizar o pedido",
    QTDESMALLER: "Quantidade não pode ser menor que um.",
    PRICESMALLER: "Valor não pode ser menor que um."
}

const erroMsg = {
    UNKNOWN: "Erro desconhecido.",
    MANDATORY: "Campos obrigatórios não preenchidos.",
    ALREADY: "Registro já existe",
    UNIQUE: "Já existe um outro registro com as mesmas chaves.",
    INVALIDFORMAT: "Formato invalido",
    TABLENOT: "Tabela não existe"
}

const resultNotFoud = { data: { data: [], message: httpMsg.NOTFOUND }, code: 404 }
const resultMadatory = { data: { data: [], message: erroMsg.MANDATORY }, code: 500 }
const resultNotExists = { data: { data: [], message: erroMsg.TABLENOT }, code: 500 }

module.exports = 
    {httpMsg, 
    erroMsg,
    resultNotFoud,
    resultMadatory,
    resultNotExists
}