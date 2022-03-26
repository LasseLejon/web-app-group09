exports.getErrorsCreateScanner = function(scanner){	
	const errors = []
	const scannerId = Number(scanner.scannerId)

	if(!Number.isInteger(scannerId || scanner.scannerId == "")){
		errors.push('invalidInput')
	}

	if(!scanner.isAdmin){
		errors.push('notAdmin')
	}
	return errors
}

exports.getErrorsGetScannerById = function(scanner){
	const errors = []
	
	if(!scanner.length){
		errors.push('notFound')
	}
	return errors
}

exports.getErrorsUpdateScanner = function(scanner){	
	const errors = []
	const scannerId = Number(scanner.newScannerId)

	if(!Number.isInteger(scannerId) || scanner.newScannerId == ""){
		errors.push('invalidInput')
	}

	if(!scanner.isAdmin){
		errors.push('notAdmin')
	}
	return errors
}

exports.getErrorsDeleteScanner = function(scanner){
	const errors = []

	if(!scanner.isAdmin){
		errors.push('notAdmin')
	}
	if(scanner.scannerInUse){
		errors.push('scannerInUse')
	}
	return errors
}

exports.getErrorsBorrowScanner = function(scannerBorrowDetails, scannerBorrowSession){
	const errors = []

	if(scannerBorrowDetails.isLoggedIn){
		if(scannerBorrowSession.length > 0){
			errors.push("accountHasActiveScanner")
		}
	}
	else{
		errors.push('notLoggedIn')
	}
	return errors
}

exports.getErrorsReturnScanner = function(scannerReturnDetails, scannerBorrowSession){
	const errors = []

	if(scannerReturnDetails.isLoggedIn){
		if(scannerBorrowSession.length > 0){
			if(scannerReturnDetails.accountId != scannerBorrowSession[0].accountId){
				errors.push('accountsNotMatching')
			}
		}
		else{
			errors.push('scannerNotInUse')
		}
	}
	else{
		errors.push('notLoggedIn')
	}
	return errors
}