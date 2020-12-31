const httpMsg = {
    NOTFOUND: "Record not found.",
    FOUND: "Record found success.",
    CREATED: "Record created.",
    UPDATED: "Record updated.",
    DELETED: "Record deleted.",
    NOTPROCESS: "Record not processed"
}

const erroMsg = {
    UNKNOWN: "Unknown error.",
    MANDATORY: "Mandatory field not informed.",
    ALREADY: "Rocord already exists",
    UNIQUE: "Another record already exists with the same unique field.",
    INVALIDFORMAT: "Invalid format",
    TABLENOT: "Table does not exists"
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