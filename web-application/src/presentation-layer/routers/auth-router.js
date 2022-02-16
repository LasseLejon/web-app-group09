const express = require('express')



module.exports = function({authManager}){

    const router = express.Router()

    router.get('/', function(request, response){
        response.render('login.hbs')
})

    router.post('/', function(request,response){
        const username = request.body.name
        const inputPassword = request.body.pass
        

        const account = {
            username: username,
            password: inputPassword
        }
        
        authManager.getPasswordByUsername(username,account,function(errors,password){
            console.log(errors.length)
            console.log(inputPassword,password.pass, authManager.compareInputAndStoredPassword(inputPassword,password.pass))
            
            if(errors.length > 0 || !authManager.compareInputAndStoredPassword(inputPassword,password.pass)){
                const model = {
                    username: username,
                    errors: errors
                }
              
                response.render('login.hbs',model)
            }
            
            else{
                request.session.isLoggedIn = true
                request.session.isAdmin = true
              //  request.session.daniel = 15
                
                response.redirect('/login')
            }


        })
            
    })

    return router
}