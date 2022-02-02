const mysql = require('mysql')

const connection = mysql.createConnection({
	host     : 'database',
    port     : 3306,
	user     : 'root',
	password : 'abc123',
	database : 'my-platform'
})

module.exports = connection