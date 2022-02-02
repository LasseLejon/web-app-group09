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

exports.getScannerById = function(id, callback){
    const query = 'SELECT * FROM Scanners WHERE scannerId = ? LIMIT 1'
    const values = [id]

    db.query(query, values, function(error, scanner){
        if(error){
            callback(['databaseError'], null)
        }else{
            callback([], scanner)
        }
    })
}

exports.createScanner = function(scanner, callback){
    const query = 'INSERT INTO Scanners (scannerNumber) VALUES (?)'
    const values = [scanner.scannerNumber]

    db.query(query, values, function(error, result){
        if(error){
            if(error.code == 'ER_DUP_ENTRY'){
                callback(['scannerNumberAlreadyInDatabase'], null)
            }else{
                callback(['databaseError'], null)
            }
        }else{
            callback([],result.insertId)
        }
    })
}

exports.updateScannerById = function(scanner, callback){
    const query = 'UPDATE Scanners SET scannerNumber = ? WHERE scannerId = ?'
    const values = [scanner.scannerNumber, scanner.scannerId]

    db.query(query, values, function(error, result){
        if(error){
            if(error.code == 'ER_DUP_ENTRY'){
                callback(['scannerNumberAlreadyInDatabase'], null)
            }else{
                callback(['databaseError'], null)
            }
        }else{
            callback([],result.insertId)
        }
    })
}

exports.deleteScannerById = function(scannerId, callback){
    const query = 'DELETE FROM Scanners WHERE scannerId = ?'
    const values = [scannerId]

    db.query(query, values, function(error, result){
        if(error){
            callback(['databaseError'], null)
        }else{
            callback([])
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