const authValidator = require('./auth-validator')

module.exports = function({authRepository}){
	return{

        getPasswordByUsername: function(username,account, callback){
            authRepository.getPasswordByUsername(username,function(error,password){
                console.log("hej",password)
            const errors = authValidator.getErrorsNewLogin(account,password)
			if(errors.length > 0){
				callback(errors, null)
				return
			}

            })
            


		//	console.log(authRepository.getPasswordByUsername(username, callback))

            
		}







    }

}
