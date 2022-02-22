const express = require('express')

const { response } = require('express')







module.exports = function({authManager}){

    const router = express.Router()  
   

    router.get('/login', function(request, response){
       
        response.render('login-auth.hbs')
})

    router.get('/logout', function(request, response){
               
        response.render('logout-auth.hbs')
    })

    router.post('/logout', function(request,response){
        
        request.session.isLoggedIn = false
        response.redirect('/auth/login')


    })

    router.post('/login', function(request,response){
        const username = request.body.username
        const inputPassword = request.body.pass
        

        const account = {
            username: username,
            password: inputPassword
        }
        
        authManager.login(username,account,function(errors,storedAccount){        
            if(errors.length > 0){
                const model = {
                    username: username,
                    errors: errors
                }             
                response.render('login-auth.hbs',model)
            }           
            else{               
                request.session.isLoggedIn = true 
                console.log(storedAccount.isAdmin)
                if(storedAccount.isAdmin == 'yes'){
                    request.session.isAdmin = true
                }                        
                response.redirect('/auth/login')
            }
        })           
    })

    return router
}