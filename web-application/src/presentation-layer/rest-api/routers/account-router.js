//const express = require('express')
//const bodyParser = require('body-parser')
//const app = require('../../app')
const ACCESS_TOKEN_SECRET = "adksfjdsfdsfsdf"
const { response } = require('express')



module.exports = function({accountManager,authManager}){
    
    
    const express = require('express')
    const bodyParser = require('body-parser')
    const jwt = require('jsonwebtoken')
    const router = express.Router() 
 //   router.use(express.json())
 //   router.use(express.urlencoded({ extended: false }))
    

    router.get("/account", function(request, response){

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

    router.post('/create',function(request,response){
            const username = request.body.username
            const password = request.body.password
            const isAdmin = request.body.admin
            const authorizationHeader = request.header("Authorization")
            const access_token = authorizationHeader.substring("Bearer ".length)
            const hashedPassword = accountManager.hashPassword(password)
            const account = {
                username: username,
                password: hashedPassword,
                isAdmin: isAdmin
            }
            // invalid grant om token är fel eller expired
            // unauthirized_client om ej admin status
            jwt.verify(access_token, ACCESS_TOKEN_SECRET, function(error,payload){
                console.log(payload.isAdmin)
                if(error){
                    console.log("gar in fel")
                    response.status(401).end()
                }
                if(payload.isAdmin != true){
                    console.log("gar in ratt")
                    response.status(401).end()
                }
                if(payload.isAdmin == true){
                    accountManager.createAccount(account,function(errors,id){
                        if(errors.length > 0){
                            console.log("hejhej")
        
                            response.status(404).json(errors)
                        }
        
                        else{
        
                           // response.setHeader(account)
                            console.log(account)
                        //    console.log(respone.status(201).json(account))
                            response.status(201).json(account)
                        }
                               
                    })  
                }
                
            })

    })

    

    router.post('/tokens', function(request,response){
        const grant_type = request.body.grant_type
        const username = request.body.username
        const password = request.body.password

        var payload = {

        }

        const account = {
            username: username,
            password: password,
            grant_type: grant_type
        }

        authManager.loginFromRestApi(username,account,function(errors,storedAccount){
            if(errors.length > 0){  
                if(errors == "invalid_client")  {
                    response.status(401).json(errors)
                }   
                else{               
                response.status(400).json(errors)
                }

            } 
            if(authManager.checkIfAdmin(storedAccount.isAdmin))
                payload = {
                    isLoggedIn:true,
                    isAdmin:true
                }
            else{
                payload = {
                    isLoggedIn: true,
                    isAdmin:false
                } 
            }
           
            jwt.sign(payload,ACCESS_TOKEN_SECRET,function(err, token) {
                console.log("else", token)
                response.status(200).json({"access_token: ": token})
            })           

        })
    })


    return router
}