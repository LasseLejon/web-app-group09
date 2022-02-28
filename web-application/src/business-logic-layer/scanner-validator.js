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