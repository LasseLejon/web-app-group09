exports.getErrorsNewScanner = function(scanner){
	
	const errors = []
	/* if(!scanner.hasOwnProperty("scannerNumber")){
		errors.push("scannerNumberMissing")
	} */
    if(scanner.scannerId == ""){
        errors.push("scannerIdMissing")
    }
	
	return errors
	
}

exports.getErrorsDeleteScanner = function(scanner){
	const errors = []
	if(scanner.scannerInUse){
		errors.push('scannerInUse')
	}
	return errors
}

exports.getErrorsBorrowScanner = function(scannerBorrowDetails, scannerBorrowSession){

	const errors = []
	if(scannerBorrowDetails.isLoggedIn){
		console.log(scannerBorrowSession, "hsdafhasdlkfhalskdfjhls")
		if(scannerBorrowSession.length > 0){
			errors.push("accountHasActiveScanner")
		}
	}else{
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
		}else{
			errors.push('scannerNotInUse')
		}
	}else{
		errors.push('notLoggedIn')
	}
	return errors
}