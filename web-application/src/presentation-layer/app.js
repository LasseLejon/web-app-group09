const express = require('express')
const expressHandlebars = require('express-handlebars')
const path = require('path')
const mysql = require('mysql')

const dbConnection = mysql.createConnection({
  host: "database",
  port: 3306,
  user: "root",
  password: "abc123",
  database: "my-platform"
})

const app = express()

app.engine('hbs', expressHandlebars.engine({
    defaultLayout: 'main.hbs'
}))

app.set('views', path.join(__dirname, "views"))

app.get('/', function(request, response){
  response.render('start.hbs')

  dbConnection.query("SELECT * FROM humans", function(error, humans){
    if(error){
      console.log(error)
    }
    else{
      console.log("Got humans:")
      for(const human of humans){
        console.log(human.name)
      }
    }
    
  })
})
console.log("wow")
console.log("hello")
console.log("asdasdasddsa")

app.listen(8080, function(){
  console.log("Web application listening on port 8080.")
})