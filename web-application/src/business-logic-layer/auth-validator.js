const bcrypt = require('bcryptjs');

const EMPTY_FORM = 0


function compareInputAndStoredPassword(inputPassword,storedPassword){
            
    return bcrypt.compareSync(inputPassword, storedPassword)
   
}

exports.getErrorsNewLogin = function(inputAccount,storedAccount){	
    const errors = []
    if(typeof(storedAccount) == "undefined"){
        errors.push("No such username exist, please write your username again")
        return errors
    }
    
    if(!compareInputAndStoredPassword(inputAccount.password, storedAccount.password)){
        errors.push("Wrong password, please rewrite your password")
    }
       
	return errors	
}

exports.getErrorsNewLoginRestApi = function(inputAccount,storedAccount){	
    const errors = []

    if(inputAccount.username.length == EMPTY_FORM || inputAccount.password.length == EMPTY_FORM){
        errors.push("invalid_request")
        return errors
    }   
    if(inputAccount.grant_type != "password"){
        errors.push("unsupported_grant_type")
    }
    if(typeof(storedAccount) == "undefined"){
        errors.push("No such username exist, please write your username again")
      //  return errors
    }   
    if(!compareInputAndStoredPassword(inputAccount.password, storedAccount.storedPassword)){
        errors.push("invalid_client")
    }

	return errors	
}





