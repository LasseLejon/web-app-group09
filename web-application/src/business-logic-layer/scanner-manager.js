//const scannerRepository = require('../data-access-layer/scanner-repository')
const scannerValidator = require('./scanner-validator')

module.exports = function({scannerRepository}){
	return {

		getAllScanners: function(callback){
			scannerRepository.getAllScanners(callback)
		},
		
		getScannerById: function(id, callback){
			scannerRepository.getScannerById(id, callback)
		},
		
		createScanner: function(scanner, callback){
			const errors = scannerValidator.getErrorsNewScanner(scanner)
			if(errors.length > 0){
				callback(errors, null)
				return
			}
			scannerRepository.createScanner(scanner, callback)
		},
		
		updateScannerById: function(scanner, callback){
			const errors = scannerValidator.getErrorsNewScanner(scanner)
			if(errors.length > 0){
				callback(errors, null)
				return
			}
			scannerRepository.updateScannerById(scanner, callback)
		},
		
		deleteScannerById: function(scanner, callback){
			scannerRepository.deleteScannerById(scanner, callback)
		},

		borrowScannerById: function(scannerBorrowDetails, callback){
			scannerRepository.borrowScannerById(scannerBorrowDetails, callback)
		},

		returnScannerByScannerBorrowSessionId: function(scannerBorrowDetails, callback){
			scannerRepository.returnScannerByScannerBorrowSessionId(scannerBorrowDetails, callback)
		},

		getActiveScannerByAccountId: function(accountId, callback){
			scannerRepository.getActiveScannerByAccountId(accountId, callback)
		},

		getScannerBorrowSessionByScannerId: function(scannerId, callback){
			scannerRepository.getScannerBorrowSessionByScannerId(scannerId, callback)
		},

		returnScannerByScannerId: function(scannerId, callback){
			scannerRepository.returnScannerByScannerId(scannerId, callback)
		}

	}
}
