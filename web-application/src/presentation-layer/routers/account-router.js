const express = require('express')
const accountManager = require('../../business-logic-layer/account-manager')
const csrf = require('csurf')

//const csrfProtection = csrf()

const router = express.Router()
//router.use(csrfProtection)

router.get("/create-new", function(request, response){

	response.render("accounts-create-new.hbs")
})

router.post('/create-new', function(request,response){
    const username = request.body.name
    const password = request.body.pass

    const account = {
        username: username,
        password: password
    }

    accountManager.createAccount(account,function(errors,id){
        if(errors){
            const model = {
                username: username,
                errors: errors,
                id: id,
            }
            response.render('accounts-create-new.hbs',model)
        }
        else{
            response.redirect('/create-new')
        }


    })
        
  })




router.get("/sign-in", function(request, response){
	response.render("accounts-sign-in.hbs")
})

router.get("/", function(request, response){
	accountManager.getAllAccounts(function(errors, accounts){
		const model = {
			errors: errors,
			accounts: accounts
		}
		response.render("accounts-list-all.hbs", model)
	})
})

router.get('/:username', function(request, response){
	
	const username = request.params.username
	
	accountManager.getAccountByUsername(username, function(errors, account){
		const model = {
			errors: errors,
			account: account
		}
		response.render("accounts-show-one.hbs", model)
	})
	
})

module.exports = router