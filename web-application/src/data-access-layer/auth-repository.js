const db = require('./database')

module.exports = function({}){

	return {
		/*
		Retrieves all accounts ordered by username.
		Possible errors: databaseError
		Success value: The fetched accounts in an array.
		*/
        getPasswordByUsername: function(username, callback){
			
			const query = `SELECT password as pass FROM Accounts WHERE username = ? LIMIT 1`
			const values = [username]
			
			db.query(query, values, function(error, password){
				if(error){
					callback(['databaseError'], null)
				}else{
					callback([], password[0])
				}
			})
			
		}
    }
}