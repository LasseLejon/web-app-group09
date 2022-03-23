//const accountRepository = require('../data-access-layer/account-repository')
const accountValidator = require('./account-validators')
const bcrypt = require('bcryptjs');

module.exports = function({accountRepository}){
	return{
		getAllAccounts: function(callback){
			accountRepository.getAllAccounts(callback)
		},

		getAccountById: function(id, callback){
			accountRepository.getAccountById(id, callback)
		},
		
		createAccount: function(account, callback){
			
			// Validate the account.
			console.log("test4",account.isAdmin)
    		console.log("test5", account.username)
    		console.group("test6", account.password)
			const errors = accountValidator.getErrorsNewAccount(account)
			
			if(0 < errors.length){
				console.log("finns det errors", errors)
				callback(errors, null)
				return
			}
			
			accountRepository.createAccount(account, callback)
			
		},
		
		updateAccountById: function(account, callback){
			const errors = accountValidator.getErrorsNewAccount(account)
			console.log("account", account)
			if(errors.length > 0){
				callback(errors, null)
				return
			}
			accountRepository.updateAccountById(account, callback)
		},
		
		getAccountByUsername: function(username, callback){
			accountRepository.getAccountByUsername(username, callback)
		},
		
		deleteAccountById: function(account, callback){
			accountRepository.deleteAccountById(account, callback)
		},

		hashPassword: function(password){
			const salt = bcrypt.genSaltSync(10);
			const hash = bcrypt.hashSync(password, salt);

			return hash

		}

	}
}

