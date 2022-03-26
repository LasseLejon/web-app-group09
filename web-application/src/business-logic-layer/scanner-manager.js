const scannerValidator = require('./scanner-validator')
const scannerAuthorizer = require('./scanner-authorizer')

module.exports = function({scannerRepository}){
	return {

		getAllScanners: function(callback){
			scannerRepository.getAllScanners(callback)
		},
		
		getScannerById: function(id, callback){
			scannerRepository.getScannerById(id, function(error, scanner){
				const errors = scannerValidator.getErrorsGetScannerById(scanner)
				if(errors.length > 0){
					callback(['notFound'], scanner)
				}		
				else{
					callback([], scanner)
				}
			})
		},
		
		createScanner: function(requestData, callback){
			const errors = scannerValidator.getErrorsCreateScanner(requestData)
			if(errors.length > 0){
				callback(errors, null)
				return
			}
			scannerRepository.createScanner(requestData, callback)
		},
		
		updateScannerById: function(requestData, callback){
			const errors = scannerValidator.getErrorsUpdateScanner(requestData)
			if(errors.length > 0){
				callback(errors, null)
				return
			}
			scannerRepository.updateScannerById(requestData, callback)
		},
		
		deleteScannerById: function(requestData, callback){
			scannerRepository.getScannerById(requestData.scannerId, function(error, scanner){
				const errors = scannerValidator.getErrorsDeleteScanner(requestData)
				if(errors.length > 0){
					callback(errors, null)
				}else{
				scannerRepository.deleteScannerById(requestData.scannerId, callback)
				}
			})
		},

		borrowScannerById: function(scannerBorrowDetails, callback){
			scannerRepository.getScannerBorrowSessionByAccountId(scannerBorrowDetails.accountId, function(error, scannerBorrowSession){
				const errors = scannerValidator.getErrorsBorrowScanner(scannerBorrowDetails, scannerBorrowSession)

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
				const errors = scannerValidator.getErrorsReturnScanner(scannerReturnDetails, scannerBorrowSession)
				if(errors.length > 0 ){
					callback(errors, scannerReturnDetails)
				}else{			
					scannerRepository.returnScannerByScannerId(scannerReturnDetails, callback)
				}
			})
		},

		getScannerBorrowSessionDetails: function(account, callback){
			const errors = scannerAuthorizer.getAuthorizationErrorsGetScannerBorrowDetails(account)
			if(errors.length > 0){
				callback(errors, null)
			}
			else{
				scannerRepository.getScannerBorrowSessionDetails(callback)
			}
		}

	}
}
