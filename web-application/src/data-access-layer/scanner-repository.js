const db = require('./database')

exports.getAllScanners = function(callback){

    const query = 'SELECT * FROM Scanners'

    db.query(query, function(error, scanners){
        if(error){
            callback(['databaseError'], null)
        }else{
            callback([], scanners)
        }
    })

}

exports.createScanner = function(scanner, callback){
    const query = 'INSERT INTO Scanners (scannerNumber) VALUES (?)'
    const values = [scanner.scannerNumber]

    db.query(query, values, function(error, result){
        if(error){
            callback(['databaseError'], null)
        }else{
            callback([],result.insertId)
        }
    })
}

/* exports.createAccount = function(account, callback){
	
	const query = `INSERT INTO accounts (username, password) VALUES (?, ?)`
	const values = [account.username, account.password]
	
	db.query(query, values, function(error, results){
		if(error){
			// TODO: Look for usernameUnique violation.
			callback(['databaseError'], null)
		}else{
			callback([], results.insertId)
		}
	})
	
} */