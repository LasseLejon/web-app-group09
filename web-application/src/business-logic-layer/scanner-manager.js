const scannerRepository = require('../data-access-layer/scanner-repository')

exports.getAllScanners = function(callback){
    scannerRepository.getAllScanners(callback)
}

exports.createScanner = function(scanner, callback){
	scannerRepository.createScanner(scanner, callback)
}

/* exports.getAllAccounts = function(callback){
	accountRepository.getAllAccounts(callback)
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

exports.getAccountByUsername = function(username, callback){
	accountRepository.getAccountByUsername(username, callback)
} */