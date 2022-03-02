const express = require('express')
const bodyParser = require('body-parser')
const app = require('../../app')
const { response } = require('express')


module.exports = function({accountManager,authManager}){
    const router = express.Router() 

    router.get("/account", function(request, response){


        accountManager.getAllAccounts(function(error,accounts){
            if(error.length > 0){
                response.status(404).json(error)
            }
            response.status(200).json(accounts)
        })
        
    })

    router.post('/create',function(request,respone){
            const username = request.body.username
            const password = request.body.password
            const isAdmin = request.body.admin
    
            const hashedPassword = accountManager.hashPassword(password)
        
            const account = {
                username: username,
                password: hashedPassword,
                isAdmin: isAdmin
            }
        
            accountManager.createAccount(account,function(errors,id){
                if(errors.length > 0){
                    response.status(404).json("hej")
                }

                else{
                    response.status(200).json(account)
                }
        
        
            })
                
          


    })

    router.use(bodyParser.json())
    router.post('/login', function(request,respone){
        const username = request.body.username1
        const inputPassword = request.body.password1



        const account = {
            username: username,
            password: inputPassword
        }

        authManager.login(username,account,function(errors,storedAccount){
            console.log("hej", storedAccount)        
            if(errors.length > 0){                         
                response.status(404).json(errors)
            }  
            console.log("hej", storedAccount)
            console.log("ajajajaj")

            response.status(200).json("you are now logged in")



        })
    })


    return router
}