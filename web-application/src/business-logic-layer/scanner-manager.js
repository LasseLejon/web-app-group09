const scannerRepository = require('../data-access-layer/scanner-repository')
const scannerValidator = require('./scanner-validator')

exports.getAllScanners = function(callback){
    scannerRepository.getAllScanners(callback)
}

exports.getScannerById = function(id, callback){
	scannerRepository.getScannerById(id, callback)
}

exports.createScanner = function(scanner, callback){
	const errors = scannerValidator.getErrorsNewScanner(scanner)
	if(errors.length > 0){
		callback(errors, null)
		return
	}
	scannerRepository.createScanner(scanner, callback)
}

exports.updateScannerById = function(scanner, callback){
	const errors = scannerValidator.getErrorsNewScanner(scanner)
	if(errors.length > 0){
		callback(errors, null)
		return
	}
	scannerRepository.updateScannerById(scanner, callback)
}

exports.deleteScannerById = function(scanner, callback){
	scannerRepository.deleteScannerById(scanner, callback)
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