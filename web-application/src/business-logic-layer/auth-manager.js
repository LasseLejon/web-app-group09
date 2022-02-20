const authValidator = require('./auth-validator')
//const bcrypt = require('bcryptjs');

module.exports = function({authRepository}){
	return{

        login2: function(username,inputAccount, callback){

            authRepository.getAccountByUsername(username,function(error,storedAccount){
                console.log(storedAccount)
                const errors = authValidator.getErrorsNewLogin(inputAccount,storedAccount)               
                if(errors.length > 0){
                    callback(errors,storedAccount, null)
                    return
                }
                else{
                    callback(errors,storedAccount, null)
                    return
                }
            })           
        }
    }
}
