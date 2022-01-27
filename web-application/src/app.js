const express = require('express')
const expressHandlebars = require('express-handlebars')
const path = require('path')

const app = express()

app.engine('hbs', expressHandlebars.engine({
    defaultLayout: 'main.hbs'
}))

app.set('views', path.join(__dirname, "views"))

app.get('/', function(request, response){
  response.render('start.hbs')
})

app.listen(8080, function(){
  console.log("Web application listening on port 8080.")
})