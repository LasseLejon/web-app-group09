const MIN_USERNAME_LENGTH = 2
const MAX_USERNAME_LENGTH = 10


exports.getErrorsNewLogin = function(account,password){	
    const errors = []
    console.log("hej3",account.password)
   
    console.log(account.password, password.pass)
    
    if(account.password != password.pass){
        
        console.log("hej2",password.pass)
        errors.push("wrong password")
    }   
	return errors	
}