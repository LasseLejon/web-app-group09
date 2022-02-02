exports.getErrorsNewScanner = function(scanner){
	
	const errors = []
	/* if(!scanner.hasOwnProperty("scannerNumber")){
		errors.push("scannerNumberMissing")
	} */
    if(scanner.scannerNumber == ""){
        errors.push("scannerNumberMissing")
    }
	
	return errors
	
}