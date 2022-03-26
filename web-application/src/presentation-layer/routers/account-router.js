const express = require('express')






module.exports = function({accountManager}){
    const router = express.Router() 

    router.get("/", function(request, response){

        accountManager.getAllAccounts(function(errors, accounts){

            const model = {
                errors: errors,
                accounts: accounts,
                
            }
            response.render("account.hbs", model)
        })
    })
        



    router.get("/create", function(request, response){
          
        response.render("create-account.hbs")
    })
    
    router.get('/update/:id', function(request, response){
        const id = request.params.id
        accountManager.getAccountById(id, function(errors, account){

            const model = {
                errors: errors,
                account: account[0]
            }
            
            response.render('update-account.hbs', model)
        })
    })
    
    router.get('/delete/:id', function(request, response){
        const id = request.params.id
        accountManager.getAccountById(id, function(errors, account){
            const model = {
                errors: errors,
                account: account[0]
            }
            response.render('delete-account.hbs', model)
        })
    })
    
    router.post('/create', function(request,response){
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
                const model = {
                    username: username,
                    isAdmin: isAdmin,
                    errors: errors,
                    id: id
                }
                console.log("går in i fel jävla sats")
                response.render('create-account.hbs',model)
            }
            else{
                response.redirect('/account')
            }
    
    
        })
            
      })
    
      router.post('/update/:id', function(request, response){
        const username = request.body.username
        const password = request.body.password
        const hashedPassword = accountManager.hashPassword(password)
        const isAdmin = request.body.admin
        const accountId = request.params.id
        const account = {
            accountId: accountId,
            username: username,
            password: hashedPassword,
            isAdmin: isAdmin
        }
        accountManager.updateAccountById(account, function(errors, id){
            if(errors.length > 0){
                const model = {
                    errors: errors,
                    account: account,
                    id: id
                }
                response.render('update-account.hbs', model)
            }else{
                response.redirect('/account')
            }
            
        })
    })
    
    router.post('/delete/:id', function(request, response){
        const accountId = request.params.id
        accountManager.deleteAccountById(accountId, function(errors){
            if(errors.length > 0){
                const model = {
                    errors: errors,
                    accountId: accountId
                }
                response.render('delete-account.hbs', model)
            }else{
                response.redirect('/account')
            }
        })
    })
    
    return router
}
    

