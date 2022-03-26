//const express = require('express')
//const bodyParser = require('body-parser')
//const app = require('../../app')
const ACCESS_TOKEN_SECRET = "adksfjdsfdsfsdf"
const { response } = require('express')



module.exports = function({accountManager}){
    
    
    const express = require('express')
    const bodyParser = require('body-parser')
    const jwt = require('jsonwebtoken')
    const router = express.Router() 
 //   router.use(express.json())
 //   router.use(express.urlencoded({ extended: false }))
    

    router.get("/accounts", function(request, response){

        accountManager.getAllAccounts(function(errors,accounts){
            if(errors.length > 0){
                response.status(404).json(errors)
            }
            response.status(200).json(accounts)
        })
        
    })
    router.use(bodyParser.json())
    router.use(bodyParser.urlencoded({
        extended: false
    }))

    router.post('/accounts',function(request,response){
            const username = request.body.username
            const password = request.body.password
            const isAdmin = request.body.admin
        //    const authorizationHeader = request.header("Authorization")
         //   const access_token = authorizationHeader.substring("Bearer ".length)
            const hashedPassword = accountManager.hashPassword(password)
            const account = {
                username: username,
                password: hashedPassword,
                isAdmin: isAdmin
            }
            // invalid grant om token är fel eller expired
            // unauthirized_client om ej admin status
                          
            accountManager.createAccount(account,function(errors,id){
                if(errors.length > 0){
                    console.log("hejhej")

                    response.status(404).json(errors)
                }

                else{

                    // response.setHeader(account)
                    console.log(account)
                //    console.log(respone.status(201).json(account))
                    response.status(201).end()
                }
                        
            })           
    })

    




    return router
}