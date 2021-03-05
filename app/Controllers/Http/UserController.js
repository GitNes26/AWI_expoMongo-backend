'use strict'
const User = use('App/Models/User')

class UserController {
    async getUser({response, auth}){
        const user = await auth.getUser()
        return response.json(user)
    }
}

module.exports = UserController
