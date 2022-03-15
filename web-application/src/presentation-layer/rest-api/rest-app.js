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

            app.use(function(request, response, next){
                response.setHeader("Access-Control-Allow-Origin", "*")
                response.setHeader("Access-Control-Allow-Methods", "*")
                response.setHeader("Access-Control-Allow-Headers", "*")
                response.setHeader("Access-Control-Expose-Headers", "*")
                next()
            })

            const routers = require('../../main.js')
            const accountRouterRest = routers.accountRouterRest
            const scannerRouterRest = routers.scannerRouterRest
            const authRouterRest = routers.authRouterRest

            app.use('/', accountRouterRest)
            app.use('/', scannerRouterRest)
            app.use('/', authRouterRest)

            return app



        }
    }
    
}
