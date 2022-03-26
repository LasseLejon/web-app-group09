const MIN_USERNAME_LENGTH = 2
const MAX_USERNAME_LENGTH = 10
const MIN_PASSWORD_LENGTH = 2  
const MAX_PASSWORD_LENGTH = 20


exports.getErrorsNewAccount = function(account){	
    const errors = []
    
    if(!account.hasOwnProperty("username")){
        errors.push("usernameMissing")
    }
    if(account.shouldBeAdmin != "yes" && account.shouldBeAdmin != "no"){
        errors.push("Please write yes or no on admin status, do not use capital letters")
    }
    if(account.username.length < MIN_USERNAME_LENGTH){
        errors.push("The username needs to be at least "+MIN_USERNAME_LENGTH+" characters.")
    }
    if(account.username.length > MAX_USERNAME_LENGTH){
        errors.push("The username can maximum be "+MAX_USERNAME_LENGTH+" characters.")
    } 
    if(account.password.length < MIN_PASSWORD_LENGTH){
        errors.push("The password needs to be atleast "+MIN_PASSWORD_LENGTH+" characters")
    }
    if(account.password.length > MAX_PASSWORD_LENGTH){
        errors.push("The password can maximum be "+MAX_PASSWORD_LENGTH+" characters")
    }
	return errors	
}
exports.getErrorsNewAccountRestApi = function(account){	
    const errors = []
    
    if(!account.hasOwnProperty("username")){
        errors.push("usernameMissing")
    }
    if(account.shouldBeAdmin != "yes" && account.shouldBeAdmin != "no"){
        errors.push("Please write yes or no on admin status, do not use capital letters")
    }
    if(account.username.length < MIN_USERNAME_LENGTH){
        errors.push("The username needs to be at least "+MIN_USERNAME_LENGTH+" characters.")
    }
    if(account.username.length > MAX_USERNAME_LENGTH){
        errors.push("The username can maximum be "+MAX_USERNAME_LENGTH+" characters.")
    } 
    if(account.password.length < MIN_PASSWORD_LENGTH){
        errors.push("The password needs to be atleast "+MIN_PASSWORD_LENGTH+" characters")
    }
    if(account.password.length > MAX_PASSWORD_LENGTH){
        errors.push("The password can maximum be "+MAX_PASSWORD_LENGTH+" characters")
    }
	return errors	
}

