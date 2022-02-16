const authValidator = require('./auth-validator')
const bcrypt = require('bcryptjs');

module.exports = function({authRepository}){
	return{

        getPasswordByUsername: function(username,account, callback){

            const errors = authValidator.getErrorsNewLogin(account)
			if(errors.length > 0){
				callback(errors, null)
				return
			}
			authRepository.getPasswordByUsername(username, callback)
        }
      ,
    

        compareInputAndStoredPassword: function(inputPassword,storedPassword){
            
           return bcrypt.compareSync(inputPassword, storedPassword);

            
        }







    }

}
