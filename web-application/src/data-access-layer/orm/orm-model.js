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

/* 
CREATE TABLE ScannerBorrowSession(
    scannerBorrowSessionId INT AUTO_INCREMENT PRIMARY KEY,
    borrowDate DATETIME NOT NULL,
    returnDate DATETIME,
    accountId INT NOT NULL,
    scannerId INT NOT NULL, 
    FOREIGN KEY (scannerId) REFERENCES Scanners(scannerId)
    ON UPDATE CASCADE,
    FOREIGN KEY (accountId) REFERENCES Accounts(accountId)
); */

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
    returnDate: DataTypes.DATE
})

Scanner.belongsTo(ScannerBorrowSession, {foreignKey: 'scannerId', onUpdate: 'CASCADE'})

Account.belongsTo(ScannerBorrowSession, {foreignKey: 'accountId'})

module.exports = {
    sequelize,
    Scanner,
    ScannerBorrowSession
}