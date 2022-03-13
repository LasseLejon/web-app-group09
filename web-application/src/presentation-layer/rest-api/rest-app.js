//const jwt = require('jsonwebtoken')

module.exports = function({}){
    return{
        getRestApp: function(){

            const express = require('express')
            const app = express()
           // const csrf = require('csurf')

            app.use(express.json())

            app.use(express.urlencoded({
                extended: false
            }))

            const routers = require('../../main.js')
            const accountRouterRest = routers.accountRouterRest
            const scannerRouterRest = routers.scannerRouterRest


            app.use('/', accountRouterRest)
            app.use('/', scannerRouterRest)

            return app



        }
    }
    
}
