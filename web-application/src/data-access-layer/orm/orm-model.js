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


module.exports = {
    Scanner
}