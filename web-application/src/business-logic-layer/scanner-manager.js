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
			scannerRepository.getScannerBorrowSessionByAccountId(scannerBorrowDetails.accountId, function(error, scannerBorrowSession){
				const errors = scannerValidator.getErrorsBorrowScanner(scannerBorrowSession)
				if(errors.length > 0){
					callback(errors, null)
				}else{
					scannerRepository.borrowScannerById(scannerBorrowDetails, callback)
				}	
			})	
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

		getScannerBorrowSessionByAccountId: function(scannerId, callback){
			scannerRepository.getScannerBorrowSessionByAccountId(scannerId, callback)
		},

		returnScannerByScannerId: function(scannerReturnDetails, callback){

			scannerRepository.getScannerBorrowSessionByScannerId(scannerReturnDetails.scannerId, function(error, scannerBorrowSession){
				console.log(scannerBorrowSession)

				const errors = scannerValidator.getErrorsReturnScanner(scannerReturnDetails.accountId, scannerBorrowSession)
				if(errors.length > 0 ){
					callback(errors, scannerReturnDetails)
				}else{			
					scannerRepository.returnScannerByScannerId(scannerReturnDetails, callback)
				}
			})
		},

		getScannerBorrowSessionDetails: function(callback){
			scannerRepository.getScannerBorrowSessionDetails(callback)
		}

	}
}
