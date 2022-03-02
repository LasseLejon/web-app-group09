

module.exports = function({}){
    return{
        getRestApp: function(){

            const express = require('express')
            const app = express()
            const csrf = require('csurf')

            app.use(express.json())

            app.use(express.urlencoded({
                extended: false
            }))

            const routers = require('../../main.js')
            const accountRouterRest = routers.accountRouterRest


            app.use('/', accountRouterRest)

            return app



        }
    }
    
}