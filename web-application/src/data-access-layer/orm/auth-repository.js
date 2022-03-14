const sequelize = require('./orm-model')

const Account = sequelize.Account

module.exports = function({}){

	return {
		getAccountByUsername: function(username, callback){
            Account.findAll({where: {username: username}, raw: true})
            .then(function(storedAccount){
                console.log(storedAccount)
                callback([], storedAccount[0])
            })
            .catch(function(error){
                callback(['databaseError'])
            })
		}
    }
}