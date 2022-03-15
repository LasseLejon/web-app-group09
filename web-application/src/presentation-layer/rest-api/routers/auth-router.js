const ACCESS_TOKEN_SECRET = "adksfjdsfdsfsdf"




module.exports = function({authManager}){

    const express = require('express')
    const bodyParser = require('body-parser')
    const jwt = require('jsonwebtoken')
    const router = express.Router() 

    router.use(bodyParser.json())
    router.use(bodyParser.urlencoded({
        extended: false
    }))



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
                console.log("not good")               
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