const MIN_USERNAME_LENGTH = 2
const MAX_USERNAME_LENGTH = 10


exports.getErrorsNewAccount = function(account){	
    const errors = []

    if(!account.hasOwnProperty("username")){
        errors.push("usernameMissing")
    }
    if(account.isAdmin != "yes" || "no"){
        errors.push("Please write yes or no on admin status, do not use capital letters")
    }
    if(account.username.length < MIN_USERNAME_LENGTH){
        errors.push("The username needs to be at least "+MIN_USERNAME_LENGTH+" characters.")
    }
    if(account.username.length > MAX_USERNAME_LENGTH){
        errors.push("The username can maximum be "+MAX_USERNAME_LENGTH+" characters.")
    } 
	return errors	
}

