const sequelize = require('./orm-model')

const Scanner = sequelize.Scanner
const ScannerBorrowSession = sequelize.ScannerBorrowSession
const seql = sequelize.sequelize


module.exports = function(){
    return{
        getAllScanners: function(callback){
            Scanner.findAll({raw: true}).then(function(scanners){
                callback([], scanners)
                console.log(scanners)
            }).catch(function(error){
                console.log(error)
                callback(['databaseError'], null)
            })
        },

        getScannerById: function(id, callback){
            
            Scanner.findAll({where: {scannerId: id}, raw: true}).then(function(scanner){
                callback([], scanner)
            }).catch(function(error){
                callback(['databaseError'])
            })
        },

        createScanner: function(scanner, callback){
            Scanner.create({scannerId: scanner.scannerId}).then(function(){
                callback([])
            }).catch(function(error){
                if(error.name == 'SequelizeUniqueConstraintError'){
                    callback(['SequelizeUniqueConstraintError'])
                }
                else{
                    callback(['databaseError'])
                }
            })
        },

        updateScannerById: function(scanner, callback){
            Scanner.update({scannerId: scanner.newScannerId}, {where: {scannerId: scanner.scannerId}})
            .then(function(){
                callback([])
            }).catch(function(error){
                if(error.name == 'SequelizeUniqueConstraintError'){
                    callback(['SequelizeUniqueConstraintError'])
                }
                else{
                    callback(['databaseError'])
                }
            })
        },

        deleteScannerById: function(scannerId, callback){
            Scanner.destroy({where: {scannerId: scannerId}}).then(function(){
                callback([])
            }).catch(function(error){
                callback(['databaseError'])
            })
        },

        getScannerBorrowSessionByAccountId: function(accountId, callback){

            ScannerBorrowSession.findAll({where: {accountId: accountId}, raw: true})
            .then(function(scannerBorrowSession){
                callback([], scannerBorrowSession)
            }).catch(function(error){
                callback(['databaseError'])
            })
            /* const query = 'SELECT * FROM ScannerBorrowSession WHERE accountId = ? and returnDate IS NULL'
            db.query(query, accountId, function(error, scannerBorrowSession){
                if(error){
                    callback(['databaseError'])
                }else{
                    callback([], scannerBorrowSession)
                }
            }) */
        },

        borrowScannerById: function(scannerBorrowDetails, callback){
            const date = new Date().toISOString().slice(0, 19).replace('T', ' ')
            const query = 'UPDATE Scanners set scannerInUse = true WHERE scannerId = ?'
            const queryBorrowSession = 'INSERT INTO ScannerBorrowSession (borrowDate, accountId, scannerId) VALUES (?, ?, ?)'          
            const values = [scannerBorrowDetails.date, scannerBorrowDetails.accountId, scannerBorrowDetails.scannerId]

            return seql.transaction(t => {
                return Scanner.update({scannerInUse: true}, {where:{scannerId: scannerBorrowDetails.scannerId}}, {transaction: t})
                .then(function(){
                   return ScannerBorrowSession.create({accountId: scannerBorrowDetails.accountId, scannerId: scannerBorrowDetails.scannerId, borrowDate: scannerBorrowDetails.date}
                    , {transaction: t})   
                })
            }).then(function(){
                callback([])
            }).catch(function(error){
                callback('databaseError')
            })
        },

        getScannerBorrowSessionDetails: function(callback){

            ScannerBorrowSession.findAll({raw: true}).then(function(scannerBorrowSessionDetails){
                console.log(scannerBorrowSessionDetails)
                callback([], scannerBorrowSessionDetails)
            }).catch(function(error){
                callback(error)
            })
            

           /*  const query = 'SELECT * FROM ScannerBorrowSession'
            db.query(query, function(error, scannerBorrowSessionDetails){
                if(error){
                    callback(['databaseError'])
                }
                callback([], scannerBorrowSessionDetails)
            }) */
        }

    }
}


