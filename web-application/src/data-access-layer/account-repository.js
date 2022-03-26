const db = require('./database')

module.exports = function({}){

	return {

		getAllAccounts: function(callback){
			const query = `SELECT * FROM Accounts`
			const values = []
			
			db.query(query, values, function(error, accounts){
				if(error){
					callback(['databaseError'], null)
				}
				else{
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
				}
				else{
					callback([], account)
				}
			})
		},

		getAccountByUsername: function(username, callback){
			const query = `SELECT * FROM accounts WHERE username = ? LIMIT 1`
			const values = [username]
			
			db.query(query, values, function(error, accounts){
				if(error){
					callback(['databaseError'], null)
				}
				else{
					callback([], accounts[0])
				}
			})
			
		},

		createAccount: function(account, callback){
			const query = `INSERT INTO Accounts (username, password, isAdmin) VALUES (?, ?, ?)`
			const values = [account.username, account.hashedPassword, account.shouldBeAdmin]
			
			db.query(query, values, function(error, results){
				if(error){
					if(error.code == 'ER_DUP_ENTRY'){
						callback(['AccountAlreadyInDatabase'], null)
					}
					else{
						callback(['databaseError'], null)
					}
				}
				else{
					callback([], results.insertId)
				}
			})
			
		},

		updateAccountById: function(account, callback){
			const query = 'UPDATE Accounts SET username = ?, password = ?, isAdmin = ? WHERE accountId = ?'
			const values = [account.username, account.hashedPassword, account.shouldBeAdmin, account.accountId]

			db.query(query, values, function(error, result){
				if(error){
					if(error.code == 'ER_DUP_ENTRY'){
						callback(['AccountAlreadyInDatabase'], null)
					}
					else{
						callback(['databaseError'], null)
					}
				}
				else{
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
				}
				else{
					callback([])
				}
			})
		}
	}
}

