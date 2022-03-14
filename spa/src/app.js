const express = require('express')

const app = express()

app.use(express.static(__dirname+'/static'))

app.get("*", function(request, response){
<<<<<<< HEAD
	response.sendFile(__dirname+"/src/js/index.html")
=======
	response.sendFile(__dirname+"/static/index.html")
>>>>>>> 3bedeaf2d08784c51c3577b5251494e8ba37ce77
})

app.listen(4000)