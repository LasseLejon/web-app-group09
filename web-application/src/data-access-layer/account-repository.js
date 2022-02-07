const db = require('./database')

/*
	Retrieves all accounts ordered by username.
	Possible errors: databaseError
	Success value: The fetched accounts in an array.
*/
exports.getAllAccounts = function(callback){
	
	const query = `SELECT * FROM Accounts`
	const values = []
	
	db.query(query, values, function(error, accounts){
		if(error){
			callback(['databaseError'], null)
		}else{
			callback([], accounts)
		}
	})
	
}

exports.getAccountById = function(id, callback){
    const query = 'SELECT * FROM Accounts WHERE accountId = ? LIMIT 1'
    const values = [id]

    db.query(query, values, function(error, account){
        if(error){
            callback(['databaseError'], null)
        }else{
            callback([], account)
        }
    })
}

/*
	Retrieves the account with the given username.
	Possible errors: databaseError
	Success value: The fetched account, or null if no account has that username.
*/
exports.getAccountByUsername = function(username, callback){
	
	const query = `SELECT * FROM accounts WHERE username = ? LIMIT 1`
	const values = [username]
	
	db.query(query, values, function(error, accounts){
		if(error){
			callback(['databaseError'], null)
		}else{
			callback([], accounts[0])
		}
	})
	
}

/*
	Creates a new account.
	account: {username: "The username", password: "The password"}
	Possible errors: databaseError, usernameTaken
	Success value: The id of the new account.
*/
exports.createAccount = function(account, callback){
	
	const query = `INSERT INTO Accounts (username, password) VALUES (?, ?)`
	const values = [account.username, account.password]
	
	db.query(query, values, function(error, results){
		if(error){
			// TODO: Look for usernameUnique violation.
			callback(['databaseError'], null)
		}else{
			callback([], results.insertId)
		}
	})
	
}

exports.updateAccountById = function(account, callback){
    const query = 'UPDATE Accounts SET username = ?, password = ? WHERE accountId = ?'
    const values = [account.username, account.password, account.accountId]

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
}

exports.deleteScannerById = function(accountId, callback){
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