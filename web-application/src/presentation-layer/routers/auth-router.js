const express = require('express')



module.exports = function({authManager}){

    const router = express.Router()

    router.get('/', function(request, response){
        response.render('login.hbs')
})

    router.post('/', function(request,response){
        const username = request.body.username
        const inputPassword = request.body.pass
        

        const account = {
            username: username,
            password: inputPassword
        }
        
        authManager.login2(username,account,function(errors,storedAccount){        
            if(errors.length > 0){
                const model = {
                    username: username,
                    errors: errors
                }             
                response.render('login.hbs',model)
            }           
            else{               
                request.session.isLoggedIn = true 
                console.log(storedAccount.isAdmin)
                if(storedAccount.isAdmin == 'yes'){
                    request.session.isAdmin = true
                }
                         
                console.log("stored",storedAccount)
                response.redirect('/login')
            }
        })           
    })

    return router
}