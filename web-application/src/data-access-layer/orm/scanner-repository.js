const sequelize = require('./orm-model')

const Scanner = sequelize.Scanner

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
            
            Scanner.findOne({where: {scannerId: id}, raw: true}).then(function(scanner){
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
        }

    }
}


