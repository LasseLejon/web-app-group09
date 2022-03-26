const db = require('./database')

module.exports = function({}){

	return {
		/*
		Retrieves all accounts ordered by username.
		Possible errors: databaseError
		Success value: The fetched accounts in an array.
		*/
		getAllAccounts: function(callback){
			
			const query = `SELECT * FROM Accounts`
			const values = []
			
			db.query(query, values, function(error, accounts){
				if(error){
					callback(['databaseError'], null)
				}else{
					callback([], accounts)
				}
			})
			
		},

		getAccountById: function(id, callback){
			const query = 'SELECT * FROM Accounts WHERE accountId = ? LIMIT 1'
			const values = [id]

			db.query(query, values, function(error, account){
				if(error){
					callback(['databaseError'], null)
				}else{
					callback([], account)
				}
			})
		},


/*
	Creates a new account.
	account: {username: "The username", password: "The password"}
	Possible errors: databaseError, usernameTaken
	Success value: The id of the new account.
*/


		/*
			Retrieves the account with the given username.
			Possible errors: databaseError
			Success value: The fetched account, or null if no account has that username.
		*/
		getAccountByUsername: function(username, callback){
			
			const query = `SELECT * FROM accounts WHERE username = ? LIMIT 1`
			const values = [username]
			
			db.query(query, values, function(error, accounts){
				if(error){
					callback(['databaseError'], null)
				}else{
					callback([], accounts[0])
				}
			})
			
		},


		/*
			Creates a new account.
			account: {username: "The username", password: "The password"}
			Possible errors: databaseError, usernameTaken
			Success value: The id of the new account.
		*/
		createAccount: function(account, callback){
			
			const query = `INSERT INTO Accounts (username, password, isAdmin) VALUES (?, ?, ?)`
			const values = [account.username, account.password, account.shouldBeAdmin]
			console.log(values)
			
			db.query(query, values, function(error, results){
				if(error){
					// TODO: Look for usernameUnique violation.
					console.log(error)
					callback(['databaseError'], null)
				}else{
					console.log("test7", results.insertId)
					callback([], results.insertId)
				}
			})
			
		},

		updateAccountById: function(account, callback){
			const query = 'UPDATE Accounts SET username = ?, password = ?, isAdmin = ? WHERE accountId = ?'
			const values = [account.username, account.password, account.shouldBeAdmin, account.accountId]

			db.query(query, values, function(error, result){
				if(error){
					if(error.code == 'ER_DUP_ENTRY'){
						callback(['AccountAlreadyInDatabase'], null)
					}else{
						callback(['databaseError'], null)
					}
				}else{
					callback([],result.insertId)
				}
			})
		},

		deleteAccountById: function(accountId, callback){
			const query = 'DELETE FROM Accounts WHERE AccountId = ?'
			const values = [accountId]

			db.query(query, values, function(error, result){
				if(error){
					callback(['databaseError'], null)
				}else{
					callback([])
				}
			})
		}

	}
}

