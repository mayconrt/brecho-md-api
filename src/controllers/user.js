const firestore = require('../resources/credentials/firestore/connection')

module.exports = {

    async find(request, response) {
        try {
            const user = []

            await firestore
            .collection("gta_user")
            .get()
            .then((snapshot) => {
                snapshot.forEach((doc) => {
                    user.push(doc.data())
        
                  });                
            })
            return response.status(200).json(user)
        } catch (error) {
            return response.status(500).json({
                error: error.message
            })
        }
    },

    async findOne(request, response) {
        try {
            const {userName} = request.params

            await firestore
            .collection("gta_user")
            .where("userName", "==", userName)
            .get()
            .then((snapshot) => {
                if(snapshot.size == 0)
                    return response.status(404).json({message: "Nenhum registro encontrado"})

                snapshot.forEach((doc) => {                    
                    return response.status(200).json(doc.data())
                  });                
            })
            
        } catch (error) {
            return response.status(500).json({
                error: error.message
            })
        }
    },

    async create(request, response){

    },

    async insert(request, response){

    },
    
    async update(request, response){

    },

    async delete(request, response){

    }

}