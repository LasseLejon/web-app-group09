const MIN_USERNAME_LENGTH = 2
const MAX_USERNAME_LENGTH = 10


exports.getErrorsNewAccount = function(account){	
    const errors = []
    console.log("jag går in i validatorn")
    if(!account.hasOwnProperty("username")){
        errors.push("usernameMissing")
    }
    console.log("isadmin",account.isAdmin)
    if(account.isAdmin != "yes" && account.isAdmin != "no"){
        errors.push("Please write yes or no on admin status, do not use capital letters")
    }
    if(account.username.length < MIN_USERNAME_LENGTH){
        errors.push("The username needs to be at least "+MIN_USERNAME_LENGTH+" characters.")
    }
    if(account.username.length > MAX_USERNAME_LENGTH){
        errors.push("The username can maximum be "+MAX_USERNAME_LENGTH+" characters.")
    } 
    console.log("checkar error validator", errors)
	return errors	
}
exports.getErrorsNewAccountRestApi = function(account){	
    const errors = []
    console.log("test1",account.isAdmin)
    console.log("test2", account.username)
    console.group("test3", account.password)
    
    if(!account.hasOwnProperty("username")){
        errors.push("usernameMissing")
    }
    console.log("isadmin",account.isAdmin)
    if(account.isAdmin != "yes" && account.isAdmin != "no"){
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

