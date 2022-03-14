const express = require('express')

const app = express()


app.get("*", function(request, response){
	response.sendFile(__dirname+"/src/js/index.html")
})

app.listen(4000)