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

exports.getErrorsBorrowScanner = function(scannerBorrowSession){

	const errors = []
	if(scannerBorrowSession.length > 0){
		errors.push("accountHasActiveScanner")
	}

	return errors

}

exports.getErrorsReturnScanner = function(accountId, scannerBorrowSession){

	console.log(scannerBorrowSession)
	console.log('hej')

	const errors = []
	console.log(accountId, scannerBorrowSession.accountId)
	if(scannerBorrowSession.length > 0){
		if(accountId != scannerBorrowSession[0].accountId){
			errors.push('accountsNotMatching')
		}
	}else{
		errors.push('scannerNotInUse')
	}

	return errors
}