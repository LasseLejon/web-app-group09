const express = require('express')
const accountManager = require('../../business-logic-layer/account-manager')
//const csrf = require('csurf')

//const csrfProtection = csrf()

const router = express.Router()

//router.use(csrfProtection)

router.get("/", function(request, response){
    accountManager.getAllAccounts(function(errors, accounts){
        const model = {
            errors: errors,
            accounts: accounts
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
    const accountId = request.params.id
    const account = {
        accountId: accountId,
        username: username,
        password: password
    }
    accountManager.updateAccountById(account, function(errors, id){
        if(errors.length > 0){
            const model = {
                errors: errors,
                account: account,
                id: id
            }
            console.log(model.account)
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
                id: id
            }
            response.render('delete-account.hbs', model)
        }else{
            response.redirect('/account')
        }
    })
})




router.get("/sign-in", function(request, response){
	response.render("accounts-sign-in.hbs")
})

router.get('/update/:id', function(request, response){
    const id = request.params.id
    scannerManager.getScannerById(id, function(errors, scanner){
        const model = {
            errors: errors,
            scanner: scanner[0]
        }
        
        response.render('update-scanner.hbs', model)
    })
})












// -------------------------------------------------------------- 


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