const express = require('express')
const app = express()
module.exports = function({webApp,restApp}){
    return{
        start: function(){
            app.use('/',webApp.getWebApp())
            app.use('/api',restApp.getRestApp())
            .listen(8080)
        }

    }
}

