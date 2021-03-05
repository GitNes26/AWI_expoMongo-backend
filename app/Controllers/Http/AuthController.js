'use strict'
const User = use('App/Models/User')

class AuthController {
    
    async login({request, response, auth}){
        const {email, password} = request.all()
        const token = await auth.attempt(email, password)

        return response.json(token)
    }

    async register({request, response}){
        const {username, email, password} = request.all()
        const user = await User.create({ username, email, password})

        return response.json(user)
    }
}

module.exports = AuthController
