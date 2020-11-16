const bcrypt = require('bcrypt')

module.exports = {


    crypt(password) {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
    
        return hash
    },

    validate(password) {
        const regexNumber = /[0-9]/
        const regexUpper = /[A-Z]/
        let passwordValidate = true        


        if (password.length != 6)
            passwordValidate = false
        if (!regexNumber.test(password))
            passwordValidate = false
        if (!regexUpper.test(password))
            passwordValidate = false
    
      return passwordValidate     
    }

}