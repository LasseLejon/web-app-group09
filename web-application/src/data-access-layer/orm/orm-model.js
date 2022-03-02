const { Sequelize, DataTypes, STRING } = require('sequelize')


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
        primaryKey: true,
        autoIncrement: false
    },
    scannerInUse: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
})

const Account = sequelize.define ('Account', {
    accountId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false
    },
    isAdmin:{
        type: DataTypes.STRING,
        allowNull: false
    } 
})

const ScannerBorrowSession = sequelize.define('ScannerBorrowSession', {
    scannerBorrowSessionId:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    borrowDate:{
        type: DataTypes.DATE,
        allowNull: false
    },
    returnDate: DataTypes.DATE,
})
/* Scanner.belongsTo(ScannerBorrowSession, {foreignKey: 'scannerId'})
ScannerBorrowSession.hasMany(Scanner, {foreignKey: 'scannerId'})
Account.belongsTo(ScannerBorrowSession, {foreignKey: 'accountId'})
ScannerBorrowSession.hasMany(Account, {foreignKey: 'accountId'}) */

ScannerBorrowSession.belongsTo(Scanner, {foreignKey: 'scannerId'})
Scanner.hasMany(ScannerBorrowSession, {foreignKey: 'scannerId'})
ScannerBorrowSession.belongsTo(Account, {foreignKey: 'accountId'})
Account.hasMany(ScannerBorrowSession, {foreignKey: 'accountId'})


module.exports = {
    sequelize,
    Scanner,
    ScannerBorrowSession
}