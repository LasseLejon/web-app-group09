//const accountRepository = require('../data-access-layer/account-repository')
const accountValidator = require('./account-validators')
const accountAuthorizer = require('./account-authorizer')
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
			const errors = accountValidator.getErrorsNewAccount(account)
			
			if(0 < errors.length){
				callback(errors, null)
				return
			}			
			accountRepository.createAccount(account, callback)			
		},
		
		updateAccountById: function(account, callback){
			const errors = accountValidator.getErrorsNewAccount(account)
			accountAuthorizer.getAuthorizationErrorsUpdateAccount(errors, account)

			if(errors.length > 0){
				callback(errors, account)
			}
			else{
				accountRepository.updateAccountById(account, callback)
			}
		},
		
		getAccountByUsername: function(username, callback){
			accountRepository.getAccountByUsername(username, callback)
		},
		
		deleteAccountById: function(account, callback){
			const errors = accountAuthorizer.getAuthorizationErrorsDeleteAccount(account)

			if(errors.length > 0){
				callback(errors)
			}
			else{
				accountRepository.deleteAccountById(account.accountId, callback)
			}
		},

		hashPassword: function(password){
			const salt = bcrypt.genSaltSync(10);
			const hash = bcrypt.hashSync(password, salt);

			return hash
		}
	}
}

