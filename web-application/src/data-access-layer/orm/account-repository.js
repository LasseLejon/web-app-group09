const sequelize = require('./orm-model')
const Account = sequelize.Account

module.exports = function(){
    return{

        getAllAccounts: function(callback){
			Account.findAll({raw: true})
            .then(function(accounts){
                callback([], accounts)
            })
            .catch(function(){
                callback(['databaseError'])
            })		
		},

        getAccountById: function(id, callback){
            Account.findAll({where: {accountId: id}, raw: true})
            .then(function(account){
                callback([], account)
            })
            .catch(function(){
                callback(['databaseError'])
            })
		},

        getAccountByUsername: function(username, callback){
			Account.findAll({where: {username: username}, raw: true})
            .then(function(account){
                callback([], account)
            })
            .catch(function(){
                callback(['databaseError'])
            })
		},

        createAccount: function(account, callback){
			Account.create({
                username: account.username,
                password: account.hashedPassword,
                isAdmin: account.shouldBeAdmin
            })
            .then(function(results){
                callback([], results.insertId)
            })
            .catch(function(error){
                if(error.name == "SequelizeUniqueConstraintError"){
                    callback(['usernameAlreadyExists'])
                }
                else{
                    callback(['databaseError'])
                }
            })
		},

        updateAccountById: function(account, callback){
            Account.update({username: account.username, password: account.hashedPassword, isAdmin: account.shouldBeAdmin}, {where: {accountId: account.accountId}})
            .then(function(result){
                callback([], result.insertId)
            })
            .catch(function(error){
                if(error.name == "SequelizeUniqueConstraintError"){
                    callback(['usernameAlreadyExists'])
                }
                else{
                    callback(['databaseError'])
                }
            })
		},

        deleteAccountById: function(accountId, callback){
            Account.destroy({where: {accountId: accountId}})
            .then(function(){
                callback([])
            })
            .catch(function(){
                callback(['databaseError'])
            })
		}
    }
}