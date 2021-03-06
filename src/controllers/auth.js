const firestore = require('../database/connection')
const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')
const authconfig = require('../resources/credentials/auth/auth.json')



    function genarateToken(userName){
        return jwt.sign(
            {userName: userName},
            authconfig.secret,
            {expiresIn: 86400}
            )
    }

    async function authorization(request, response) {
        const {userName, password} = request.params
        
        try {
            await firestore
            .collection("gta_user")
            .where("userName", "==", userName)
            .get()
            .then((snapshot) => {
                if(snapshot.size == 0)
                    return response.status(404).json({message: "User not found"})
                    
                snapshot.forEach( async (doc) => {
                    
                    const passValidate = await bcrypt.compare(password, doc.data().password)

                    if(userName == doc.data().userName && passValidate ){
                        const token = genarateToken(userName)

                        return response.status(200).json({data: doc.data(), token})   
                    }                    
                       

                    return response.status(400).json({message:"User or password invalid"})   

                  });                
            })
            
        } catch (error) {
            return response.status(500).json({
                error: error.message
            })
        }
    }

    module.exports = {
        authorization
    }