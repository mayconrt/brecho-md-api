const firestore = require('../resources/credentials/firestore/connection')
const pass = require('../util/password')


async function find(request, response) {
    try {
        const user = []

        await firestore
            .collection("gta_user")
            .get()
            .then((snapshot) => {
                if (snapshot.size == 0)
                    return response.status(404).json({ message: "No record found" })
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
}

async function findOne(request, response) {
    try {
        const { userName } = request.params

        const user = await getUser(userName)
        if (user.length == 0)
            return response.status(404).json({ message: "No record found" })


        return response.status(200).json(user[0])

    } catch (error) {
        return response.status(500).json({
            error: error.message
        })
    }
}

async function create(request, response) {
    try {
        let { userName, email, password, employee, roles } = request.body

        if (!userName || !password || !roles)
            return response.status(422).json({ "message": "madatory fields" })

        const user = await getUser(userName)

        if (!user.length == 0)
            return response.status(400).json({ "message": "User already exists" })

        password = pass.crypt(password)

        await firestore
            .collection("gta_user")
            .doc(userName)
            .set({
                userName, email, password, employee, roles
            })
            .then((res) => {
                return response.status(201).json({ "message": "User created" })
            }).catch((error) => {
                return response.status(400).json({ "message": error })
            })
    } catch (error) {
        return response.status(500).json({
            error: error.message
        })
    }
}

async function update(request, response) {

    try {
        const { userName, email, employee, password, roles } = request.body

        if (!employee || !password || !roles)
            return response.status(422).json({ "message": "madatory fields" })

        const user = await getUser(userName)

        if (user.length == 0)
            return response.status(400).json({ "message": "User not found" })

        await firestore
            .collection("gta_user")
            .doc(userName)
            .set({
                userName,
                email,
                password,
                employee,
                roles
            })
            .then((res) => {
                return response.status(201).json({ "message": "User updated" })
            }).catch((error) => {
                return response.status(400).json({ "message": error })
            })
    } catch (error) {
        return response.status(500).json({
            error: error.message
        })
    }

}

async function remove(request, response) {

    try {
        const { userName } = request.params

        const user = await getUser(userName)

        if (user.length == 0)
            return response.status(400).json({ "message": "User not found" })

        await firestore
            .collection("gta_user")
            .doc(userName)
            .delete()
            .then((res) => {
                return response.status(201).json({ "message": "User deleted" })
            }).catch((error) => {
                return response.status(400).json({ "message": error })
            })
    } catch (error) {
        return response.status(500).json({
            error: error.message
        })
    }

}

async function getUser(userName) {
    const user = []
    await firestore
        .collection("gta_user")
        .where("userName", "==", userName)
        .get()
        .then((snapshot) => {
            snapshot.forEach((doc) => {
                user.push(doc.data())
            });
        })

    return user
}


module.exports = {
    find,
    findOne,
    create,
    update,
    remove
}