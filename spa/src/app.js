const express = require('express')

const app = express()

app.use(express.static(__dirname+'/static'))

app.get("*", function(request, response){


	response.sendFile(__dirname+"/static/index.html")

})

app.listen(4000)