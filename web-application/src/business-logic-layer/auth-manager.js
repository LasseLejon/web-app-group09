const authValidator = require('./auth-validator')
//const bcrypt = require('bcryptjs');

module.exports = function({authRepository}){
	return{

        login: function(username,inputAccount, callback){

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
        },
        loginFromRestApi: function(username,inputAccount, callback){

            authRepository.getAccountByUsername(username,function(error,storedAccount){
                console.log("get")
                console.log(storedAccount)
                const errors = authValidator.getErrorsNewLoginRestApi(inputAccount,storedAccount)               
                if(errors.length > 0){
                    callback(errors,storedAccount, null)
                    return
                }
                else{
                    callback(errors,storedAccount, null)
                    return
                }
            })           
        },

        checkIfAdmin: function(isAdmin){
            if(isAdmin == "yes"){
                return true
            }
            else{
                return false
            }
        }
    }
}
