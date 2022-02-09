const { Sequelize, DataTypes } = require('sequelize')


/* const connection = mysql.createConnection({
	host     : 'database',
    port     : 3306,
	user     : 'root',
	password : 'abc123',
	database : 'my-platform'
}) */
const sequelize = new Sequelize(
    'my-platform',
    'root',
    'abc123',
    {
        host: 'database',
        dialect: 'mysql',
        define: {
            timestamps: false
        }
    })
    

const Scanner = sequelize.define('Scanner', {
    scannerId: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    scannerNumber: DataTypes.INTEGER,
})

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
            Scanner.create({scannerNumber: scanner.scannerNumber}).then(function(){
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
            Scanner.update({scannerNumber: scanner.scannerNumber}, {where: {scannerId: scanner.scannerId}})
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


