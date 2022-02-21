const bcrypt = require('bcryptjs');

const EMPTY_PASSWORD_FORM = 0

function compareInputAndStoredPassword(inputPassword,storedPassword){
            
    return bcrypt.compareSync(inputPassword, storedPassword)
   
}

exports.getErrorsNewLogin = function(inputAccount,storedAccount){	
    const errors = []
  
    if(typeof(storedAccount) == "undefined"){
        errors.push("No such username exist, please write your username again")
        return errors
    }
    
    if(!compareInputAndStoredPassword(inputAccount.password, storedAccount.storedPassword)){
        errors.push("Wrong password, please rewrite your password")
    }
       
	return errors	
}





