const { Sequelize, DataTypes, STRING } = require('sequelize')

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

ScannerBorrowSession.belongsTo(Scanner, {foreignKey: 'scannerId'})
Scanner.hasMany(ScannerBorrowSession, {foreignKey: 'scannerId'})
ScannerBorrowSession.belongsTo(Account, {foreignKey: 'accountId'})
Account.hasMany(ScannerBorrowSession, {foreignKey: 'accountId'})


module.exports = {
    sequelize,
    Scanner,
    ScannerBorrowSession,
    Account
}