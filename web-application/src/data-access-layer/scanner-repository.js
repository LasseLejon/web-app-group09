const db = require('./database')

module.exports = function({}){

    return {

        getAllScanners: function(callback){

            const query = 'SELECT * FROM Scanners'
        
            db.query(query, function(error, scanners){
                if(error){
                    callback(['databaseError'], null)
                }else{
                    callback([], scanners)
                }
            })
        
        },
        
        getScannerById: function(id, callback){
            const query = 'SELECT * FROM Scanners WHERE scannerId = ? LIMIT 1'
            const values = [id]
        
            db.query(query, values, function(error, scanner){
                if(error){
                    callback(['databaseError'], null)
                }else{
                    callback([], scanner)
                }
            })
        },
        
        createScanner: function(scanner, callback){
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
        },
        
        updateScannerById: function(scanner, callback){
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
        },
        
        deleteScannerById: function(scannerId, callback){
            const query = 'DELETE FROM Scanners WHERE scannerId = ?'
            const values = [scannerId]
        
            db.query(query, values, function(error, result){
                if(error){
                    callback(['databaseError'], null)
                }else{
                    callback([])
                }
            })
        },

        borrowScannerById: function(scannerId, callback){
            const accountId = 1
            //const date = '2012-06-22 05:40:06'
            const date = '123123'
            const query = 'UPDATE Scanners set scannerInUse = true WHERE scannerId = ?'
            const queryBorrowSession = 'INSERT INTO ScannerBorrowSession (borrowDate, accountId, scannerId) VALUES (?, ?, ?)'          
            const values = [date, accountId, scannerId]


             db.beginTransaction(function(err){
                if(err){
                    return db.rollback(function(){
                        callback(['databaseError1'])
                    })
                }
                db.query(query, scannerId, function(error, result){
                    if(error){
                        return db.rollback(function(){
                            callback(['databaseError2'])
                        })
                    }

                    db.query(queryBorrowSession, values, function(error, result){
                        if(error){
                            return db.rollback(function(){
                                callback(['databaseError3'])
                            })
                        }
                        db.commit(function(error){
                            if(error){
                                return db.rollback(function(){
                                    callback(['databaseError4'])
                                })
                            }else{
                                callback([])
                            }
                        })
                    })
                })
            })
        },

/*         borrowScannerById: function(scannerId, callback){
            const query = 'UPDATE Scanners set scannerInUse = true WHERE scannerId = ?'
            db.query(query, scannerId, function(error, result){
                if(error){
                    callback(['databaseError'], null)
                }else{
                    callback([])
                }
            })
        }, */

        returnScannerById: function(scannerId, callback){
            const query = 'UPDATE Scanners set scannerInUse = false WHERE scannerId = ?'
            db.query(query, scannerId, function(error, result){
                if(error){
                    callback(['databaseError'], null)
                }else{
                    callback([])
                }
            })
        }

    }

}
