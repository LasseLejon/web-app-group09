const accountRepository = require('../data-access-layer/account-repository')
const accountValidator = require('./account-validators')

exports.getAllAccounts = function(callback){
	accountRepository.getAllAccounts(callback)
}
exports.getAccountById = function(id, callback){
	accountRepository.getAccountById(id, callback)
}

exports.createAccount = function(account, callback){
	
	// Validate the account.
	const errors = accountValidator.getErrorsNewAccount(account)
	
	if(0 < errors.length){
		callback(errors, null)
		return
	}
	
	accountRepository.createAccount(account, callback)
	
}

exports.updateAccountById = function(account, callback){
	const errors = accountValidator.getErrorsNewAccount(account)
	if(errors.length > 0){
		callback(errors, null)
		return
	}
	accountRepository.updateAccountById(account, callback)
}

exports.getAccountByUsername = function(username, callback){
	accountRepository.getAccountByUsername(username, callback)
}

exports.deleteAccountById = function(account, callback){
	accountRepository.deleteScannerById(account, callback)
}