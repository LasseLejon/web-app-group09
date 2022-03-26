const ACCESS_TOKEN_SECRET = "adksfjdsfdsfsdf"
const { response } = require('express')

module.exports = function({accountManager}){  
    
    const express = require('express')
    const bodyParser = require('body-parser')
    const router = express.Router() 
    router.use(bodyParser.json())
    router.use(bodyParser.urlencoded({
        extended: false
    }))

    router.post('/accounts',function(request,response){
        const username = request.body.username
        const password = request.body.password
        const shouldBeAdmin = request.body.shouldBeAdmin
        console.log(shouldBeAdmin)
        const hashedPassword = accountManager.hashPassword(password)
        const account = {
            username: username,
            password: hashedPassword,
            shouldBeAdmin: shouldBeAdmin
        }
        // invalid grant om token är fel eller expired
        // unauthirized_client om ej admin status
                        
        accountManager.createAccount(account,function(errors,id){
            if(errors.length > 0){
                console.log(errors)
                response.status(400).json(errors)
            }
            else{
                response.status(201).end()
            }         
        })           
    })

    return router
}