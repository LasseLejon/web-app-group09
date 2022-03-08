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
			
		},
		getAccountByUsername: function(username, callback){
			
			const query = `SELECT * FROM Accounts WHERE username = ? LIMIT 1`
			const values = [username]
			
			db.query(query, values, function(error, storedAccount){
				if(error){
					callback(['databaseError'], null)
				}else{
					callback([], storedAccount[0])
				}
			})
			
		},
		getIsAdminByUsername: function(username, callback){
			
			const query = `SELECT isAdmin as isAdmin FROM Accounts WHERE username = ? LIMIT 1`
			const values = [username]
			
			db.query(query, values, function(error, isAdmin){
				if(error){
					callback(['databaseError'], null)
				}else{
					callback([], isAdmin[0])
				}
			})
			
		}
    }
}