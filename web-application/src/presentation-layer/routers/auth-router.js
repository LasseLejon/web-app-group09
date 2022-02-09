const express = require('express')



module.exports = function({authManager}){

    const router = express.Router()

    router.get('/', function(request, response){
        response.render('login.hbs')
})

    router.post('/', function(request,response){
        const username = request.body.name
        const password = request.body.pass
        

        const account = {
            username: username,
            password: password
        }
        
        authManager.getPasswordByUsername(username,account,function(errors,password){
            if(errors){
                const model = {
                    username: username,
                    password: password,
                    errors: errors
                }
              
                response.render('login.hbs',model)
            }
            else{
                request.session.isLoggedIn = true
                request.session.daniel = 15
                
                response.redirect('/account')
            }


        })
            
    })

    return router
}