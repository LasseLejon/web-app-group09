const db = require('./database')

module.exports = function({}){

    return {

        getAllScanners: function(callback){
            const query = 'SELECT * FROM Scanners'
        
            db.query(query, function(error, scanners){
                if(error){
                    callback(['databaseError'], null)
                }
                else{
                    callback([], scanners)
                }
            })
        
        },
        
        getScannerById: function(scannerId, callback){
            const query = 'SELECT * FROM Scanners WHERE scannerId = ? LIMIT 1'
            const values = [scannerId]
        
            db.query(query, values, function(error, scanner){
                if(error){
                    callback(['databaseError'], null)
                }
                else{
                    callback([], scanner)
                }
            })
        },

        getScannerBorrowSessionByScannerId: function(scannerId, callback){
            const query = 'SELECT * FROM ScannerBorrowSessions WHERE ScannerId = ? and returnDate IS NULL'

            db.query(query, scannerId, function(error, scannerBorrowSession){
                if(error){
                    callback(['databaseError'])
                }
                else{
                    callback([], scannerBorrowSession)
                }
            })
        },

        getScannerBorrowSessionByAccountId: function(accountId, callback){
            const query = 'SELECT * FROM ScannerBorrowSessions WHERE accountId = ? and returnDate IS NULL'

            db.query(query, accountId, function(error, scannerBorrowSession){
                if(error){
                    callback(['databaseError'])
                }
                else{
                    callback([], scannerBorrowSession)
                }
            })
        },
        
        createScanner: function(scanner, callback){
            const query = 'INSERT INTO Scanners (scannerId) VALUES (?)'
            const values = [scanner.scannerId]
        
            db.query(query, values, function(error, result){
                if(error){
                    if(error.code == 'ER_DUP_ENTRY'){
                        callback(['scannerIdAlreadyInDatabase'], null)
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
        
        updateScannerById: function(scanner, callback){
            const query = 'UPDATE Scanners SET scannerId = ? WHERE scannerId = ?'
            const values = [scanner.newScannerId, scanner.scannerId]
        
            db.query(query, values, function(error, result){
                if(error){
                    if(error.code == 'ER_DUP_ENTRY'){
                        callback(['scannerIdAlreadyInDatabase'], null)
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
        
        deleteScannerById: function(scannerId, callback){
            const query = 'DELETE FROM Scanners WHERE scannerId = ?'
            const values = [scannerId]
        
            db.query(query, values, function(error, result){
                if(error){
                    callback(['databaseError'], null)
                }
                else{
                    callback([])
                }
            })
        },

        borrowScannerById: function(scannerBorrowDetails, callback){
            const query = 'UPDATE Scanners set scannerInUse = true WHERE scannerId = ?'
            const queryBorrowSession = 'INSERT INTO ScannerBorrowSessions (borrowDate, accountId, scannerId) VALUES (?, ?, ?)'          
            const values = [scannerBorrowDetails.date, scannerBorrowDetails.accountId, scannerBorrowDetails.scannerId]

             db.beginTransaction(function(err){
                if(err){
                    return db.rollback(function(){
                        callback(['databaseError'])
                    })
                }
                
                db.query(query, scannerBorrowDetails.scannerId, function(error, result){
                    if(error){
                        return db.rollback(function(){
                            callback(['databaseError'])
                        })
                    }

                    db.query(queryBorrowSession, values, function(error, result){
                        if(error){
                            return db.rollback(function(){
                                callback(['databaseError'])
                            })
                        }

                        db.commit(function(error){
                            if(error){
                                return db.rollback(function(){
                                    callback(['databaseError'])
                                })
                            }
                            else{
                                callback([])
                            }
                        })
                    })
                })
            })
        },

        /* Used to return a borrowed scanner by passing the function scannerId and scannerBorrowSessionId */

        returnScannerByScannerBorrowSessionId: function(scannerBorrowDetails, callback){
            const query = 'UPDATE Scanners set scannerInUse = false WHERE scannerId = ?'
            const queryBorrowSession = 'UPDATE ScannerBorrowSessions set returnDate = ? WHERE scannerBorrowSessionId = ?'          
            const values = [scannerBorrowDetails.returnDate, scannerBorrowDetails.scannerBorrowSessionId]

             db.beginTransaction(function(err){
                if(err){
                    return db.rollback(function(){
                        callback(['databaseError'])
                    })
                }
                
                db.query(query, scannerBorrowDetails.scannerId, function(error, result){
                    if(error){
                        return db.rollback(function(){
                            callback(['databaseError'])
                        })
                    }

                    db.query(queryBorrowSession, values, function(error, result){
                        if(error){
                            return db.rollback(function(){
                                callback(['databaseError'])
                            })
                        }

                        db.commit(function(error){
                            if(error){
                                return db.rollback(function(){
                                    callback(['databaseError'])
                                })
                            }
                            else{
                                callback([])
                            }
                        })
                    })
                })
            })
        },

        getActiveScannerByAccountId: function(accountId, callback){
            const query = 'SELECT * FROM ScannerBorrowSessions where accountId = ? and returnDate IS NULL'

            db.query(query, accountId, function(error, activeScanner){
                if(error){
                    callback(['databaseError'])
                }
                else{
                    callback([], activeScanner)
                }

            })
        },

        returnScannerByScannerId: function(scannerReturnDetails, callback){
            const query = 'UPDATE ScannerBorrowSessions set returnDate = ? WHERE scannerBorrowSessionId = ?'

            this.getScannerBorrowSessionByScannerId(scannerReturnDetails.scannerId, function(errors, scannerBorrowSession){
                if(errors.length){
                    callback(['databaseError0'])
                }
                db.beginTransaction(function(error){
                    if(error){
                        return db.rollback(callback(['databaseError']))
                    }

                    const values = [scannerReturnDetails.returnDate, scannerBorrowSession[0].scannerBorrowSessionId]
                    db.query(query, values, function(error){
                        if(error){
                            
                            return db.rollback(callback(['databaseError']))
                        }

                        db.query('UPDATE Scanners set scannerInUse = false WHERE scannerId = ?', scannerReturnDetails.scannerId, function(error){
                            if(error){
                                return db.rollback(callback(['databaseError']))
                            }

                            db.commit(function(error){
                                if(error){
                                    return db.rollback(callback(['databaseError']))
                                }
                                callback([], scannerBorrowSession)
                            })
                            
                        })
                    })

                })
                
            })
        },

        getScannerBorrowSessionDetails: function(callback){
            const query = 'SELECT * FROM ScannerBorrowSessions'

            db.query(query, function(error, scannerBorrowSessionDetails){
                if(error){
                    callback(['databaseError'])
                }
                callback([], scannerBorrowSessionDetails)
            })
        }


    }

}
