const MIN_USERNAME_LENGTH = 2
const MAX_USERNAME_LENGTH = 10


exports.getErrorsNewAccount = function(account){	
    const errors = []

    if(!account.hasOwnProperty("username")){
        errors.push("usernameMissing")
    }
    else if(account.username.length < MIN_USERNAME_LENGTH){
        errors.push("The username needs to be at least "+MIN_USERNAME_LENGTH+" characters.")
    }
    else if(account.username.length > MAX_USERNAME_LENGTH){
        errors.push("The username can maximum be "+MAX_USERNAME_LENGTH+" characters.")
    }    
	return errors	
}

